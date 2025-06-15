import axios from "axios"
import { getUnixTimestampAgo } from "./time.js";
import Students from "../models/student.js";
import StudentContestHistory from "../models/studentContestHistory.js";
import StudentProblemSolved from "../models/studentProblemSolved.js";

/** 
* Function to fetch and sync student profile from Codeforces and save them to the database
* @param {string} codeforcesHandle - The Codeforces handle of the student
* @returns {Promise<void>} - A promise that resolves when the student details are fetched and saved
*/
export async function syncStudentProfile(codeforcesHandle) {
    try {
        const { data } = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`);
        if (data.status !== "OK" || data.result.length === 0) {
            throw new Error("Failed to fetch student details");
        }

        const studentData = data.result[0];
        const fullName = `${studentData.firstName || ""} ${studentData.lastName || ""}`.trim();

        await Students.findOneAndUpdate(
            { codeforcesHandle: studentData.handle },
            {
                $set: {
                    name: fullName || "Unknown",
                    currentRating: studentData.rating || 0,
                    maxRating: studentData.maxRating || 0,
                }
            },
            { upsert: true } 
        );
        console.log("Student details fetched and saved successfully");
    } catch (error) {
        console.error("Error fetching student details:", error);
        return null;
    }
}

/**
 * Function to get the number of unsolved problems in a contest for a given student
 * @param {number} contestId - The ID of the contest
 * @param {string} codeforcesHandle - The Codeforces handle of the student
 * @returns {Promise<number>} - A promise that resolves to the number of unsolved problems
 */
async function getNumberOfUnsolvedProblems(contestId, codeforcesHandle) {
    try {

        const { data } = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1&showUnofficial=true`);

        if (data.status == "OK") {

            const totalProblems = data.result.problems.length;

            try {
                const { data } = await axios.get(`https://codeforces.com/api/contest.status?contestId=${contestId}&handle=${codeforcesHandle}`)
                if (data.status == "OK") {

                     const solvedProblems = new Set(
                        // Note: If we want number of problems solved only during the contest period
                        // we need to add submission.author.participantType === "CONTESTANT"
                        data.result
                            .filter((submission) => submission.verdict === "OK")
                            .map((submission) => submission.problem.index)
                    );
                   
                    return totalProblems - solvedProblems.size; // Return the number of unsolved problems
                }
            } catch (error) {
                console.error("Error fetching contest status:", error);
                return 0;
            }
        }

    } catch (error) {
        console.error("Error fetching contest details:", error);
        return 0;
    }   
}

/**
 * Function to sync contest history for a student
 * @param {string} codeforcesHandle - The Codeforces handle of the student
 * @returns {Promise<void>} - A promise that resolves when the contest history is synced
 */
export async function syncContestHistory(codeforcesHandle){

    const student = await Students.findOne({ codeforcesHandle });
    if (!student) throw new Error("Student not found");

    const lastSynced = student.lastSynced
    const lastSyncedUNIX = Math.floor(lastSynced.getTime() / 1000);

    try {
        const { data } = await axios.get(`https://codeforces.com/api/user.rating?handle=${codeforcesHandle}`);
        if (data.status !== "OK") {
            throw new Error("Failed to fetch contest history");
        }

        const newContests = [];

        for(let i = data.result.length - 1; i >= 0; i--) {

            if(data.result[i].ratingUpdateTimeSeconds < lastSyncedUNIX ||
                data.result[i].ratingUpdateTimeSeconds < getUnixTimestampAgo("1y")) {
                break; // Stop processing if the contest is older than one year
            }

            newContests.push({
                insertOne: {
                    document: {
                        studentId: student._id,
                        contestId: data.result[i].contestId,
                        contestName: data.result[i].contestName,
                        rank: data.result[i].rank,
                        ratingChange: data.result[i].newRating - data.result[i].oldRating,
                        newRating: data.result[i].newRating,
                        date: new Date(data.result[i].ratingUpdateTimeSeconds * 1000),
                        unsolvedCount: await getNumberOfUnsolvedProblems(data.result[i].contestId, codeforcesHandle)
                    }
                }
            });

        }

        if(newContests.length > 0){
            console.log(`Synced ${newContests.length} new contests for ${codeforcesHandle}`);
            await StudentContestHistory.bulkWrite(newContests, { ordered: false });
        }
        else {
            console.log("No new contests to sync for ", codeforcesHandle);
        }

    } catch (error) {
        console.error("Error syncing contest history:", error);
    }
}

/**
 * Function to sync problem solving data for a student
 * @param {string} codeforcesHandle - The Codeforces handle of the student
 * @returns {Promise<void>} - A promise that resolves when the problem solving data is synced
 */
export async function syncProblemSolvingData(codeforcesHandle) {

    const student = await Students.findOne({ codeforcesHandle });
    if (!student) throw new Error("Student not found");

    const lastSynced = student.lastSynced
    const lastSyncedUNIX = Math.floor(lastSynced.getTime() / 1000);

    try {
        const { data } = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforcesHandle}&from=1&count=400`);
        if (data.status !== "OK") {
            throw new Error("Failed to fetch problem solving data");
        }
        const submissions = data.result;
        const problemsSolved = [];
        let foundLatestOkSubmission = false; // Flag to track if we found the latest OK submission

        for (let i = 0; i < submissions.length; i++) {

            const submission = submissions[i];

            // break out of the loop if the submission is older than lastSynced OR 90 days ago
            if (submission.creationTimeSeconds < lastSyncedUNIX ||
                submission.creationTimeSeconds < getUnixTimestampAgo("90d")) {
                break; // Stop processing
            }

            if (submission.verdict === "OK") {
                if(!foundLatestOkSubmission) {
                    // If this is the first OK submission, update the student's lastSubmissionDate
                    await Students.updateOne(
                        { codeforcesHandle },
                        { $set: { lastSubmissionDate: new Date(submission.creationTimeSeconds * 1000) } }
                    );
                    foundLatestOkSubmission = true; // Set the flag to true
                }
                problemsSolved.push({
                    insertOne: {
                        document: {
                            studentId: student._id,
                            solvedDate: new Date(submission.creationTimeSeconds * 1000),
                            problemRating: submission.problem.rating || 0,
                        }
                    }
                });
            }
        }

        if (problemsSolved.length > 0) {
            console.log(`Synced ${problemsSolved.length} new problems solved by ${codeforcesHandle}`);
            await StudentProblemSolved.bulkWrite(problemsSolved, { ordered: false });
        } else {
            console.log("No new problems solved to sync for ", codeforcesHandle);
        }
    }
    catch (error) {
        console.error("Error syncing problem solving data:", error);
    }
}

/**
 * Function to sync student data including details, contest history, and problem solving data
 * @param {string} codeforcesHandle - The Codeforces handle of the student
 * @returns {Promise<void>} - A promise that resolves when all data is synced
 */
export async function syncStudentData(codeforcesHandle) {
    try {
        const startTime = new Date();
        await syncStudentDetails(codeforcesHandle);
        await syncContestHistory(codeforcesHandle);
        await syncProblemSolvingData(codeforcesHandle);
        const endTime = new Date();
        await Students.updateOne(
            { codeforcesHandle },
            { $set: { lastSynced: endTime } }
        );
        console.log(`Data synced successfully for ${codeforcesHandle} in ${(endTime - startTime) / 1000} seconds`);
    } catch (error) {
        console.error("Error syncing student data:", error);
    }
}

/**
 * Function to sync data for all students in the database
 * This function fetches all students' Codeforces handles and syncs their data
 * @returns {Promise<void>} - A promise that resolves when all students' data is synced
 */
export async function syncAllStudentsData() {
    try {
        const students = await Students.find({}, { codeforcesHandle: 1, _id: 0 }).lean();
        for (const student of students) {
            await syncStudentData(student.codeforcesHandle);
        }
        console.log("All students data synced successfully");
    } catch (error) {
        console.error("Error syncing all students data:", error);
    }
}


import { sendEmail } from "./resend.js";
import Students from "../../models/student.js";

/**
 * A function to send emails to students who have not made any submissions in the last 7 days.
 * @returns {Promise<void>}
 */
export async function sendGetbackToSolvingEmails(){
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Set to 7 days ago

    // Uncomment the following lines if you want to test with a shorter period
    // const twoHrsAgo = new Date();
    // twoHrsAgo.setHours(twoHrsAgo.getHours() - 2); 

    try {

        const inactiveStudents = await Students.find({
            lastSubmissionDate: { $lt: sevenDaysAgo }, // twoHrsAgo for testing
            disableInactivityEmail: { $ne: true },
        });

        if (inactiveStudents.length === 0) {
            console.log("No inactive students found.");
            return;
        }

        inactiveStudents.map(async (student) => {
            try {
                await sendEmail(student.email);
            } catch (emailError) {
                console.error(`Failed to send email to ${student.email}:`, emailError);
            }
        });

        await Students.updateMany(
            {
                _id: { $in: inactiveStudents.map(s => s._id) }
            },
            { $inc: { inactivityReminderCount: 1 } }
        );
    } catch (error) {
        console.error("Error fetching inactive students:", error);
        return;
    }
}


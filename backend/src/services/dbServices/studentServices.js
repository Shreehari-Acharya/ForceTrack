import Students from "../../models/student.js";
import StudentContestHistory from "../../models/studentContestHistory.js";
import StudentProblemSolved from "../../models/studentProblemSolved.js";

/** 
  * @desc Get a paginated list of students with basic information
  * @route GET /api/students
  * @access Public
  * @param {number} page - The current page number
  * @param {number} limit - The number of students per page
  * @param {boolean} getAll - If true, fetches all students without pagination
  * @return {Promise<Object>} - A promise that resolves to an object containing the list of students, total count, current page, and total pages
  * @throws {Error} - Throws an error if there is an issue fetching students
  */
export async function getBasicStudentsInfo(page, limit, getAll = false) {

  if (getAll) {
    try {
      const students = await Students.find()
        .sort({ name: 1 }) // default sort by name
        .select('name email phoneNumber codeforcesHandle currentRating maxRating lastSynced');
      return students;
    } catch (err) {
      console.error("Error fetching all students:", err);
      throw new Error("Failed to fetch all students");
    }
  }
    
    const skip = (page - 1) * limit;
    
    try {
    const [students, total] = await Promise.all([
      Students.find()
        .sort({ name: 1 }) // default sort by name
        .skip(skip)
        .limit(limit)
        .select('name email phoneNumber codeforcesHandle currentRating maxRating lastSynced'), 
      Students.countDocuments(),
    ]);

    return {
      students,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Error fetching students:", err);
    throw new Error("Failed to fetch students");
  }
};

/**
 * @desc Add a new student to the database
 * @route POST /api/students
 * @access Public
 * @param {Object} studentData - The student details to be added
 * @param {string} studentData.handle - The Codeforces handle of the student
 * @param {string} studentData.name - The name of the student
 * @param {string} studentData.email - The email address of the student
 * @param {string} studentData.phone - The phone number of the student
 * @returns {Promise<void>} - A promise that resolves when the student is created
 * @throws {Error} - Throws an error if there is an issue creating the student
 */
export async function createStudent({ handle, name, email, phone }) {
  try {
    await Students.create({
      codeforcesHandle: handle,
      name,
      email,
      phoneNumber: phone,
      currentRating: 0, // Only update during sync
      maxRating: 0, // Only update during sync
    });

  } catch (err) {
    console.error("Error creating student:", err);
    throw new Error("Failed to create student");
  }
}

/**
 * @desc Search for students by a search term
 * @route GET /api/students/search
 * @access Public
 * @param {string} searchTerm - The term to search for in student handles or emails
 * @returns {Promise<Array>} - A promise that resolves to an array of students matching the search term
 * @throws {Error} - Throws an error if there is an issue searching for students
 */
export async function getStudentBySearchTerm(searchTerm) {
  try {
    const students = await Students.find({
      $or: [
        { codeforcesHandle: searchTerm },
        { email: searchTerm },
      ]
    }).select('name email phoneNumber codeforcesHandle currentRating maxRating lastSynced');

    return students;
  } catch (err) {
    console.error("Error searching students:", err);
    throw new Error("Failed to search students");
  }
}

/**
 * @desc Update student details
 * @route PUT /api/students/
 * @access Public
 * @param {string} studentId - The ID of the student to update
 * @param {Object} updatedData - The data to update the student with
 * @param {string} updatedData.name - The new name of the student
 * @param {string} updatedData.email - The new email of the student
 * @param {string} updatedData.phone - The new phone number of the student
 * @returns {Promise<Object>} - A promise that resolves to the updated student object
 * @throws {Error} - Throws an error if there is an issue updating the student
 */
export async function updateStudentDetails(studentId, updatedData) {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      studentId,
      updatedData,
      { new: true }
    )
    return updatedStudent;
  } catch (error) {
    console.error("ERROR updating the student:", error)
  }
}

/**
 * @desc Delete a student and their related data
 * @route DELETE /api/students/
 * @access Public
 * @param {string} studentId - The ID of the student to delete
 * @returns {Promise<boolean>} - A promise that resolves to true if the student was deleted, false otherwise
 * @throws {Error} - Throws an error if there is an issue deleting the student
 */
export async function DeleteStudent(studentId){
  try {
    await Promise.all([
      Students.findByIdAndDelete(studentId),
      StudentProblemSolved.deleteMany({studentId}),
      StudentContestHistory.deleteMany({studentId})
    ])

    return true;
  } catch (error) {
    console.error("Error deleting Student:", error);
    return false;
  }
}

/**
 * @desc Get complete student data including contest history and problems solved
 * @route GET /api/students/s/:studentId
 * @access Public
 * @param {string} studentId - The ID of the student to fetch data for
 * @return {Promise<Object>} - A promise that resolves to an object containing the student data, contest history, and problems solved
 * @throws {Error} - Throws an error if there is an issue fetching the complete student data
 */
export async function getCompleteStudentData(studentId) {
  try {
    const student = await Students.findById(studentId)
      .select('name email phoneNumber codeforcesHandle currentRating maxRating lastSynced inactivityReminderCount disableInactivityEmail');

    if (!student) {
      throw new Error("Student not found");
    }

    const now = new Date();
    const nintyDaysAgo = new Date(now.setDate(now.getDate() - 90));
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
    
    

    const contestHistory = await StudentContestHistory.find({ studentId, date: { $gte: oneYearAgo } })
      .sort({ date: -1 }
      
      );

    const problemsSolved = await StudentProblemSolved.find({ studentId, solvedDate: { $gte: nintyDaysAgo } })
      .sort({ solvedDate: -1 });

    return {
      student,
      contestHistory,
      problemsSolved,
    };
  } catch (error) {
    console.error("Error fetching complete student data:", error);
    throw new Error("Failed to fetch complete student data");
  }
}

export async function toggleEmailNotification(studentId) {
  try {
    const student = await Students.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    student.disableInactivityEmail = !student.disableInactivityEmail;
    await student.save();

    return true;
  } catch (error) {
    console.error("Error updating email notification setting:", error);
    throw new Error("Failed to update email notification setting");
  }
}
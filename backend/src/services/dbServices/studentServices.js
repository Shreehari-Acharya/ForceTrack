import Students from "../../models/student.js";

/*
  * @desc Get a paginated list of students with basic information
  * @route GET /api/students
  * @access Public
  * @param {number} page - The current page number
  * @param {number} limit - The number of students per page
  * @returns {Object} - An object containing the list of students, total count,
  * current page, and total pages
  */
export async function getBasicStudentsInfo(page, limit){
    
    const skip = (page - 1) * limit;
    
    try {
    const [students, total] = await Promise.all([
      Students.find()
        .sort({ name: 1 }) // default sort by name
        .skip(skip)
        .limit(limit)
        .select('name email phoneNumber codeforcesHandle currentRating maxRating'), 
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

export async function createStudent({ handle, name, email, phone }) {
  try {
    Students.create({
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

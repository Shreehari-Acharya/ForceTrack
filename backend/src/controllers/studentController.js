import { createStudent, getBasicStudentsInfo } from "../services/dbServices/studentServices.js";

/**
 * @desc Get a paginated list of students with basic information
 * @route GET /api/students
 * @access Public
 * @param {Object} req - The request object containing query parameters for pagination
 * @param {Object} res - The response object to send the result
 * @returns {Object} - A JSON response containing the list of students, total count,
 * current page, and total pages
 */
export async function getStudentList(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const data = await getBasicStudentsInfo(page, limit)
        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: data.students,
            total: data.total,
            page: data.page,
            totalPages: data.totalPages
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

/** 
 * @desc Add a new student to the database
 * @route POST /api/students
 * @access Public
 * @param {Object} req - The request object containing student details in the body
 * @param {Object} res - The response object to send the result
 * @returns {Object} - A JSON response indicating success or failure of the operation
*/
export async function addNewStudent(req, res) {
    const { handle, name, email, phone } = req.body;

    if (!handle || !name || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }
    try {
        await createStudent({ handle, name, email, phone });
        res.status(201).json({
            success: true,
            message: "new student added successfully",
        })
    } catch (error) {
        console.error("Error adding new student:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}




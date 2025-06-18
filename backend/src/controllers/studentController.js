import { createStudent, DeleteStudent, getBasicStudentsInfo, getStudentBySearchTerm, updateStudentDetails } from "../services/dbServices/studentServices.js";

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

export async function findStudent(req, res) {
    const { searchTerm } = req.query;

    if (!searchTerm) {
        return res.status(400).json({
            success: false,
            message: "Search term is required",
        });
    }

    try {
        const students = await getStudentBySearchTerm(searchTerm);
        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            students: students,
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}

export async function updateStudent(req, res){
    try {
        const {studentId, name, email, phone} = req.body;

        if(!studentId){
            return res.status(400).json({
                success: false,
                message: "studentId is required"
            })
        }

        const updatedData = {
            name: name,
            email: email,
            phoneNumber: phone
        }

        console.log(updatedData)

        const updatedStudentDetails = await updateStudentDetails(studentId, updatedData);

        return res.status(201).json({
            success: true,
            updatedData: updatedStudentDetails
        })
    } catch (error) {
        console.log("error while updating user data:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export async function DeleteStudentData(req, res){

    const { studentId } = req.query;
    try {
        const success = await DeleteStudent(studentId);

        if(success){
            return res.status(200).json({
                success: success,
                message: "Student deleted successfully!"
            })
        }
        else{
            return res.status(400).json({
                success: success,
                messsage: "Something went wrong"
            })
        }
    } catch (error) {
        console.error("Error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}





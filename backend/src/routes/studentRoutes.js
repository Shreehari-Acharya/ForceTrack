import { Router } from 'express';
import { getStudentList, addNewStudent, findStudent, updateStudent, DeleteStudentData, downloadStudentData, getStudentDetails, updateEmailNotification } from '../controllers/studentController.js';

const studentRouter = Router();

// API GET: /api/students
studentRouter.get('/', getStudentList);
studentRouter.post('/',addNewStudent);
studentRouter.get('/search', findStudent);
studentRouter.put('/', updateStudent);
studentRouter.put('/emailConfig', updateEmailNotification);
studentRouter.delete('/', DeleteStudentData);
studentRouter.get('/download', downloadStudentData)
studentRouter.get('/s/:studentId', getStudentDetails);


export default studentRouter;

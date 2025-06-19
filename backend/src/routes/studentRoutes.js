import { Router } from 'express';
import { getStudentList, addNewStudent, findStudent, updateStudent, DeleteStudentData, downloadStudentData, getStudentDetails } from '../controllers/studentController.js';

const studentRouter = Router();

// API GET: /api/students
studentRouter.get('/', getStudentList);
studentRouter.post('/',addNewStudent);
studentRouter.get('/search', findStudent);
studentRouter.put('/', updateStudent);
studentRouter.delete('/', DeleteStudentData);
studentRouter.get('/download', downloadStudentData)
studentRouter.get('/s/:studentId', getStudentDetails);


export default studentRouter;

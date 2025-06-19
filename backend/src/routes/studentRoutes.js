import { Router } from 'express';
import { getStudentList, addNewStudent, findStudent, updateStudent, DeleteStudentData, downloadStudentData } from '../controllers/studentController.js';

const studentRouter = Router();

// API GET: /api/students
studentRouter.get('/', getStudentList);
studentRouter.post('/',addNewStudent);
studentRouter.get('/search', findStudent);
studentRouter.put('/', updateStudent);
studentRouter.delete('/', DeleteStudentData);
studentRouter.get('/download', downloadStudentData)


export default studentRouter;

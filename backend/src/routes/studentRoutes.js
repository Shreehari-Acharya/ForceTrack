import { Router } from 'express';
import { getStudentList, addNewStudent, findStudent, updateStudent, DeleteStudentData } from '../controllers/studentController.js';

const studentRouter = Router();

// API GET: /api/students
studentRouter.get('/', getStudentList);
studentRouter.post('/',addNewStudent);
studentRouter.get('/search', findStudent);
studentRouter.put('/', updateStudent);
studentRouter.delete('/', DeleteStudentData);


export default studentRouter;

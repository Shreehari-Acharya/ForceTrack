import { Router } from 'express';
import { getStudentList, addNewStudent } from '../controllers/studentController.js';

const studentRouter = Router();

// API GET: /api/students
studentRouter.get('/', getStudentList);
studentRouter.post('/',addNewStudent);


export default studentRouter;

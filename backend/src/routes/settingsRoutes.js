import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';


const settingsRouter = Router();

// API GET: /api/settings
settingsRouter.get('/', getSettings); 
settingsRouter.put('/', updateSettings);


export default settingsRouter;
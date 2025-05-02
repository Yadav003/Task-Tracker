import express from 'express';
import { createTask, getTasksByProject } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/project/:projectId', authMiddleware, getTasksByProject);

export default router;

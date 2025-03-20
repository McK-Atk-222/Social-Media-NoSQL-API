import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  addThought,
  removeThought,
} from '../../controllers/userController.js';

// /api/students
router.route('/').get(getAllUsers).post(createUser);

// /api/students/:studentId
router.route('/:studentId').get(getUserById).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/thoughts').post(addThought);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

export { router as userRouter} ;

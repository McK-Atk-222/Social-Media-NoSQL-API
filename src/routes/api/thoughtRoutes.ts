import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js';

// /api/thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


export { router as thoughtRouter };

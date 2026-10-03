import express from "express";
import {createComment,getComment,deleteComment} from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/:postId/comments',authMiddleware,createComment);
router.get('/:postId/comments/', authMiddleware, getComment);
router.delete('/:postId/comments/:commentId',authMiddleware,deleteComment);


export default router;
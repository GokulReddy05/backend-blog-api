import express from "express";
import { getPosts, createPost,updatePost,deletePost } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/',getPosts);
router.post('/',authMiddleware,createPost);
router.patch('/:id',authMiddleware,updatePost);
router.delete('/:id',authMiddleware,deletePost);
export default router;
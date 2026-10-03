import { createNewComment , getCommentByPostId,deleteCommentById} from "../services/commentService.js";

export const createComment = async (req, res) => {

    const postId = Number(req.params.postId);
    const { content, authorId } = req.body;
    const userId = Number(authorId);

    try {

        // Validate post ID
        if (!Number.isInteger(postId) || postId <= 0) {
            return res.status(400).json({
                error: "Invalid post ID"
            });
        }

        // Validate content
        if (typeof content !== "string" || !content.trim()) {
            return res.status(400).json({
                error: "Content is required"
            });
        }

        // Validate author ID
        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                error: "Invalid author ID"
            });
        }

        // Call service
        const newComment = await createNewComment(
            content.trim(),
            postId,
            userId
        );

        return res.status(201).json({
            message: "Comment created successfully",
            data: newComment
        });

    } catch (error) {

        console.error(error);

        if (error.message === "POST_NOT_FOUND") {
            return res.status(404).json({
                error: "Post does not exist"
            });
        }

        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                error: "User does not exist"
            });
        }

        return res.status(500).json({
            error: "Failed to create comment"
        });
    }
};


export const getComment = async (req, res) => {
    const postId = Number(req.params.postId);

    try {
        const comments = await getCommentByPostId(postId);
        return res.status(200).json({
            data: comments
        });
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            error: "Comments not found"
        });
    }
};

export const deleteComment = async (req, res) => {
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.commentId);

    try{
        const deletedComment = await deleteCommentById(postId, commentId);
        return res.status(200).json({
            message: "Comment deleted successfully",
            data: deletedComment
        });
    }catch(error){
        console.error(error);
        return res.status(404).json({
            error: "Comment not found"
        });
    }
}
import prisma from "../config/db.js";

export const createNewComment = async(content, postId, authorId) => {
    const postExist = await prisma.post.findUnique({
        where: { id: postId }
    });

    const authorExist = await prisma.user.findUnique({
        where: { id: authorId }
    });

    if (!postExist) {
        throw new Error("Post not found");
    }
    const newComment = await prisma.comment.create({
        data: {
            content,
            postId,
            authorId
        }
    });

    return newComment;

}


export const getCommentByPostId = async (postId) => {

    const postExist = await prisma.post.findUnique({
        where: { id: postId }
    });

    if (!postExist) {
        throw new Error("Post not found");
    }

    const comments = await prisma.comment.findMany({
        where: { postId },
        include: {
            author: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return comments;
}

export const deleteCommentById = async (postId, commentId) => {

    const postExist = await prisma.post.findUnique({
        where: { id: postId }
    });

    if (!postExist) {
        throw new Error("Post not found");
    }

    const commentExist = await prisma.comment.findUnique({
        where: { id: commentId }
    });

    if (!commentExist) {
        throw new Error("Comment not found");
    }

    if(commentExist.postId !== postId){
        throw new Error("Comment does not belong to the specified post");
    }

    const deletedComment = await prisma.comment.delete({
        where: { id: commentId }
    });

    return deletedComment;
}
import {getAllPosts,createNewPost,updatePostById,deletePostById} from "../services/postService.js";



export const getPosts = async (req, res) => {
    try {
        // Search
        const search = req.query.search?.trim();

        // Published filter
        const published =
            req.query.published === undefined
                ? undefined
                : req.query.published === "true";

        // Pagination
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

        const posts = await getAllPosts(search, published, page, limit);

        return res.status(200).json({
            count: posts.length,
            page,
            limit,
            data: posts
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to retrieve posts"
        });
    }
};

export const createPost = async(req,res)=>{
    const {title,content} = req.body;
    const authorId = req.user.userId; // Assuming the user ID is stored in req.user.userId after authentication

    try{
        if(!title || !content || !authorId){
            return res.status(400).json({error: "Title, content, and authorId are required"});
        }

        const post = await createNewPost({title : title.trim(),
            content : content.trim(),
            authorId
        });
        res.status(201).json({message: "Post created successfully", data: post});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to create post"});
    }
}

export const updatePost = async (req, res) => {
    const id= Number(req.params.id);
    const {title, content} = req.body;

    const updatedPost = await updatePostById(id, {title, content});
    res.status(200).json({message: "Post updated successfully", data: updatedPost});
};

export const deletePost = async (req, res) => {
    const id = Number(req.params.id);
    const deletedPost = await deletePostById(id);
    res.status(200).json({message: "Post deleted successfully", data: deletedPost});
}
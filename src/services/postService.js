import prisma from "../config/db.js";





export const getAllPosts = async (search, published, page, limit) => {

    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
        where: {
            ...(search && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        content: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            }),

            ...(published !== undefined && {
                published: published
            })
        },

        skip: skip,
        take: limit,

        orderBy: {
            id: "desc"
        }
    });

    return posts;
};

export const createNewPost = async(postData)=>{
    const {title,content,authorId} = postData;

      const userExists = await prisma.user.findUnique({
            where: { id: authorId },
        });

    if (!userExists) {
        throw new Error("Author not found");
    }

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            authorId,
        },
    });

    return newPost;
};

export const updatePostById = async (id, postData) => {
    const { title, content } = postData;

    const updatedPost = await prisma.post.update({
        where : { id },
        data: postData,
    });
    return updatedPost;
}

export const deletePostById = async(id)=>{
    const deletedPost = await prisma.post.delete({
        where : { id }
    })
    return deletedPost;
}
import { Post } from "../model"

const findAllPost = async () => {
    return await Post.findAll();
};

const findPostById =async (postId: string) => {
    return await Post.findByPk(postId);
};

const createNewPost =async (postData: {}) => {
    return await Post.create(postData);
};

const updatePostById = async (postData: {}, postId: string) => {
    return await Post.update(postData, {
        where: {
            id: postId
        }
    });
};

const deletePostById =async (postId: string) => {
    return await Post.destroy({
        where: {
            id: postId
        }
    });
};


export {
    findAllPost,
    findPostById,
    createNewPost,
    updatePostById,
    deletePostById
}


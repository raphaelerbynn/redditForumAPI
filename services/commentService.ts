import { Comment } from "../model"

const findAllComment = async (postId: string) => {
    return await Comment.findAll({
        where: {
            postId: postId
        }
    });
};

const findCommentById =async (commentId: string) => {
    return await Comment.findByPk(commentId);
};

const createNewComment =async (commentData: {}) => {
    return await Comment.create(commentData);
};

const updateCommentById = async (commentData: {}, commentId: string) => {
    return await Comment.update(commentData, {
        where: {
            id: commentId
        }
    });
};

const deleteCommentById =async (commentId: string) => {
    return await Comment.destroy({
        where: {
            id: commentId
        }
    });
};


export {
    findAllComment,
    findCommentById,
    createNewComment,
    updateCommentById,
    deleteCommentById
}


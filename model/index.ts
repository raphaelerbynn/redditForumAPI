import Post from "./PostModel";
import Comment from "./CommentModel";
import User from "./UserModel";

Post.hasMany(Comment, { 
    foreignKey: "postId" ,
    onDelete: "cascade"
});
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "cascade"
});
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "cascade"
});
Comment.belongsTo(User, { foreignKey: "userId" });

export {
    Post,
    Comment,
    User
}
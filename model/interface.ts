import { Model } from "sequelize"


interface UserModel extends Model{
    email: string,
    password: string
}

interface PostModel extends Model{
    userId: string
}

interface CommentModel extends Model{
    userId: string
}

export {
    UserModel,
    PostModel,
    CommentModel
}
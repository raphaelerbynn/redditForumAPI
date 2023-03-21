import { User } from "../model";

const createNewUser =async (userData: {}) => {
    return await User.create(userData);
};

const findUserByEmail =async (email: string) => {
    return await User.findByPk(email);
};

export {
    createNewUser,
    findUserByEmail
}


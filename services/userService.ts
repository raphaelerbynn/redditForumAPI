import { User } from "../model";

const createNewUser =async (userData: {}) => {
    return await User.create(userData);
};

export {
    createNewUser
}


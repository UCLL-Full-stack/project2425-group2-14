import userDb from '../repository/user.db';
import { User } from '../model/user';

const getAllUsers = (): Promise<User[]> => {
    const users = userDb.getAll();
    if (!users) {
        throw new Error('No users found');
    }

    return users;
};

export default { getAllUsers };

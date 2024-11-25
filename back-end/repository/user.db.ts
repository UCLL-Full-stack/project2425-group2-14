import { User } from '../model/user';
import db from './db';

const getAll = async (): Promise<User[]> => {
    try {
        const users = await db.user.findMany({ orderBy: { id: 'asc' } });
        return users.map((user) => User.from(user));
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error : ${error}`);
    }
};

export default {
    getAll,
};

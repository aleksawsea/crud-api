import { randomUUID } from 'node:crypto';
import { users } from '../db/db';
import { User } from '../types/user';
import { isUUID } from '../utils/uuidValidator';

export const UserService = {
  getAll(): User[] {
    return users;
  },
  getByUserId(id: string): User {
    if(!isUUID(id)) throw { status: 400, message: 'Invalid UUID' };
    const user = users.find((el) => el.id === id);
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
  },
  create(data: Omit<User, 'id'>): User {
    const { username, age, hobbies } = data;
    if (!username || age == null || !Array.isArray(hobbies)) {
      throw { status: 400, message: 'Missing required fields' };
    };
    const newUser: User = { id: randomUUID(), username, age, hobbies };
    users.push();
    return newUser;
  },
  update(id: string, data: Partial<Omit<User, 'id'>>): User {
    const found = this.getByUserId(id);
    Object.assign(found, data);
    return found;
  },
  remove(id: string): void {
    this.getByUserId(id);
    const userIdx = users.findIndex((el) => el.id === id);
    users.splice(userIdx, 1);
  }
};

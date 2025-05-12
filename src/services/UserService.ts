import { randomUUID } from 'node:crypto';
import { users } from '../db/db';
import { User } from '../types/user';
import { isUUID } from '../utils/uuidValidator';
import { HttpError } from '../utils/httpError';

export const userService = {
  getAll(): User[] {
    return users;
  },
  getByUserId(id: string): User {
    if(!isUUID(id)) throw new HttpError(400, 'Invalid UUID');
    const user = users.find((el) => el.id === id);
    if (!user) throw new HttpError(404, 'User not found');
    return user;
  },
  create(data: Omit<User, 'id'>): User {
    const { username, age, hobbies } = data;
    if (!username || age == null || !Array.isArray(hobbies)) {
      throw new HttpError(400, 'Missing required fields');
    };
    const newUser: User = { id: randomUUID(), username, age, hobbies };
    users.push(newUser);
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

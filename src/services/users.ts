// @packages
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
// @scripts
import Mongolib from 'src/lib/mongo';
import User from 'src/models/user';

class UserService {
  collection: string;
  mongoDB: Mongolib;
  constructor() {
    this.collection = 'users';
    this.mongoDB = new Mongolib();
  }

  async getUser(email: string) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });

    if (user) {
      return new User(user);
    }

    return new User();
  }

  async createUser(user: User) {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = user.updatePassword(hashedPassword);

    const newUserId = await this.mongoDB.create(this.collection, newUser);

    return newUserId as ObjectId;
  }

  async verifyUserExists(email: string) {
    const [user] = (await this.mongoDB.getAll(this.collection, { email })) as User[];
    return !!user;
  }

  async getOrCreateuser(user: User) {
    const queriedUser = await this.getUser(user?.email);

    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser(user);

    const newUser = await this.getUser(user?.email);

    return newUser;
  }
}

export default UserService;

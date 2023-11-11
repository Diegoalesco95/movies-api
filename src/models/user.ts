// @packages
import { ObjectId } from 'mongodb';

type TUser = {
  _id: ObjectId;
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
};

export default class User {
  public _id;
  public email = '';
  public isAdmin = false;
  public name = '';
  public password = '';

  constructor(user?: TUser) {
    if (user) {
      this._id = user._id;
      this.email = user.email;
      this.name = user.name;
      this.password = user.password;
      this.isAdmin = user.isAdmin || false;
    }
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
    return { ...this };
  }

  deletePassWord() {
    this.password = '';
  }
}

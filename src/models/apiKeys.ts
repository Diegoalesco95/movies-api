// @packages
import { ObjectId } from 'mongodb';

type TApiKey = {
  _id: ObjectId;
  token: string;
  scopes: string[];
};

export default class ApiKey {
  public _id;
  public token = '';
  public scopes = [''];

  constructor(apiKey: TApiKey) {
    if (apiKey) {
      this._id = apiKey._id;
      this.token = apiKey.token;
      this.scopes = apiKey.scopes;
    }
  }
}

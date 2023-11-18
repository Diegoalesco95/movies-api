import MongoLib from 'src/lib/mongo';
import ApiKey from 'src/models/apiKeys';

class ApiKeysService {
  collection: string;
  mongoDB: MongoLib;
  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }
  async getApiKey(token: string) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    const newApiKey = new ApiKey(apiKey);
    return newApiKey;
  }
}

export default ApiKeysService;

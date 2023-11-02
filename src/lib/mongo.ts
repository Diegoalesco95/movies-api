// @packages
import { MongoClient, ObjectId, Db, Document, Filter, OptionalId } from 'mongodb';
// @scripts
import config from '@config/index';
import Movie from '@models/movies';
import User from '@models/user';

const USER = encodeURIComponent(config.dbUser as 'string | number | boolean');
const PASSWORD = encodeURIComponent(config.dbPassword as 'string | number | boolean');
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}?retryWrites=true&w=majority`;

class MongoLib {
  client: MongoClient;
  dbName: string | undefined;
  static connection: any;
  constructor() {
    this.client = new MongoClient(MONGO_URI, { monitorCommands: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        try {
          this.client.connect().then(() => {
            console.log('[✅ You have successfully connected to mongo]');
            resolve(this.client.db(this.dbName));
          });
        } catch (error) {
          reject(error);
        }
      });
    }
    return MongoLib.connection;
  }

  getAll(collection: string, query: Filter<Document>) {
    return this.connect().then((db: Db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection: string, id: string) {
    return this.connect().then((db: Db) => {
      return db.collection(collection).findOne({ _id: new ObjectId(id) });
    });
  }

  create(collection: string, data: OptionalId<Document> | User | Movie) {
    return this.connect()
      .then((db: Db) => {
        return db.collection(collection).insertOne(data);
      })
      .then(({ insertedId }: { insertedId: ObjectId }) => insertedId);
  }

  update(collection: string, id: string, data: Movie) {
    return this.connect()
      .then((db: Db) => {
        return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: false });
      })
      .then(({ matchedCount }: { matchedCount: number }) => {
        if (matchedCount > 0) {
          return id;
        }
        return null;
      });
  }

  delete(collection: string, id: string) {
    return this.connect()
      .then((db: Db) => {
        return db.collection(collection).deleteOne({ _id: new ObjectId(id) });
      })
      .then(({ deletedCount }: { deletedCount: number }) => {
        if (deletedCount) return id;
        return null;
      });
  }
}

export default MongoLib;

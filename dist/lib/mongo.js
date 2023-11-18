"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @packages
const mongodb_1 = require("mongodb");
// @scripts
const config_1 = __importDefault(require("../config"));
const USER = encodeURIComponent(config_1.default.dbUser);
const PASSWORD = encodeURIComponent(config_1.default.dbPassword);
const DB_NAME = config_1.default.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config_1.default.dbHost}?retryWrites=true&w=majority`;
class MongoLib {
    constructor() {
        this.client = new mongodb_1.MongoClient(MONGO_URI, { monitorCommands: true });
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
                }
                catch (error) {
                    reject(error);
                }
            });
        }
        return MongoLib.connection;
    }
    getAll(collection, query) {
        return this.connect().then((db) => {
            return db.collection(collection).find(query).toArray();
        });
    }
    get(collection, query) {
        const filter = typeof query === 'string' ? { _id: new mongodb_1.ObjectId(query) } : query;
        return this.connect().then((db) => {
            return db.collection(collection).findOne(filter);
        });
    }
    create(collection, data) {
        return this.connect()
            .then((db) => {
            return db.collection(collection).insertOne(data);
        })
            .then(({ insertedId }) => insertedId);
    }
    update(collection, id, data) {
        return this.connect()
            .then((db) => {
            return db.collection(collection).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data }, { upsert: false });
        })
            .then(({ matchedCount }) => {
            if (matchedCount > 0) {
                return id;
            }
            return null;
        });
    }
    delete(collection, id) {
        return this.connect()
            .then((db) => {
            return db.collection(collection).deleteOne({ _id: new mongodb_1.ObjectId(id) });
        })
            .then(({ deletedCount }) => {
            if (deletedCount)
                return id;
            return null;
        });
    }
}
exports.default = MongoLib;

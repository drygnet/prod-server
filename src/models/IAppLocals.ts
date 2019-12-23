import { Collection, Db, MongoClient, ObjectId } from 'mongodb';

interface IAppLocals {
  collection: Collection;
  client: MongoClient;
  db: Db;
  id: ObjectId;
  [x: string]: any;
}

export default IAppLocals;

import { NextFunction, Request, Response } from 'express';
import { Db, MongoClient, ObjectId } from 'mongodb';
import apps from '../apps';

let client: MongoClient;
let counter = 0;

const setClient = (cl: MongoClient) => {
  client = cl;
};

const appIndex = (req: Request, res: Response) => {
  counter++;
  res.send({ apps, counter });
};

const addMetadata = (req: Request, res: Response, next: any) => {
  res.locals.metadata = {
    date: new Date().toJSON(),
    user: {
      id: res.locals.user.sub,
      name: res.locals.user.name
    }
  };

  next();
};

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  res.status(500);
  if (err.name === 'UnauthorizedError') {
    res.status(401);
  }
  res.send({ error: err });
};

const resolveApp = (req: Request, res: Response, next: any) => {
  const appName = req.params.appName;
  if (!apps[appName]) {
    next(`No app named ${appName} !!!`);
  }
  res.locals.appName = appName;
  res.locals.app = apps[appName];
  res.locals.app.name = appName;
  next();
};

const resolveDb = (req: Request, res: Response, next: any) => {
  res.locals.db = client.db(req.params.appName);
  res.locals.client = client;
  next();
};

const resolveCollection = (req: Request, res: Response, next: any) => {
  const collectionName = req.params.collection;
  if (!res.locals.app.collections.find((col: any) => col.name === collectionName)) {
    next(`Collection ${collectionName} does not exist in ${res.locals.app.name}`);
  } else {
    const db: Db = res.locals.db;
    db.collection(req.params.collection, (error: any, collection: any) => {
      res.locals.collection = collection;
    });
  }
  if (req.params.id) {
    try {
      res.locals.id = new ObjectId(req.params.id);
    } catch (er) {
      next('not a valid ObjectId');
    }
  }

  next();
};

const handleFunction = (req: Request, res: Response, next: any) => {
  const app = res.locals.app;
  const functionName = req.params.functionName;
  if (!app[functionName]) {
    next(`No function named ${functionName} !!!`);
  } else {
    app[functionName](req, res);
  }
};

export {
  appIndex,
  addMetadata,
  resolveApp,
  handleFunction,
  errorHandler,
  resolveCollection,
  resolveDb,
  setClient
};

import bodyParser from 'body-parser';
import express from 'express';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import config from './server/db';
import { initDB } from './server/initDB';
import {
  errorHandler,
  handleFunction,
  resolveApp,
  resolveCollection,
  resolveDb,
  setClient
} from './server/middleware';
import { MongoHelper } from './server/mongo.helper';
import validateShema from './server/validate';

MongoHelper.connect(config.DBServer).then((res) => {
  const client = res;
  setClient(client);
  initDB(client);
});

const jsonParser = bodyParser.json();
const srv = express();
const port = 4000;

srv.use(jsonParser);
srv.use('/:appName/*', resolveApp);
srv.use(':appName/files', resolveDb);
srv.use('/:appName/functions/:functionName', [handleFunction]);
srv.use('/:appName/db/:collection/:id*?', [resolveDb, resolveCollection]);

srv.post('/:appName/files', (req: express.Request, res: express.Response) => {
  const storage = new GridFsStorage({
    db: res.locals.db,
    file: (request, file) => {
      return {
        bucketName: 'storage',
        filename: file.originalname,
      };
    }
  });

  storage.on('connection', (db) => {
    const upload = multer({
      storage
    }).single('file');
    upload(req, res, (err: any) => {
      if (err) {
        return res.send({ title: 'Uploaded Error', message: 'File could not be uploaded', error: err });
      }
      res.send({ title: 'Uploaded', message: `File has been uploaded!`, id: req.file.id });
    });
  });
});

srv.use('/:appName/db/:collection/:id?', async (req: express.Request, res: express.Response) => {
  const collection: Collection = res.locals.collection;
  const id = res.locals.id;
  const client = res.locals.client;
  let doc: any;
  if (req.body) {
    delete req.body._id;
    delete req.body.metadata;
  }
  switch (req.method) {
    case 'POST':
      if (!req.params.id) {
        collection.insertOne(req.body, (err: any, dbresp: any) => {
          if (err) {
            validateShema(client, req, res, err);
          } else {
            res.send(dbresp.ops[0]);
          }
        });
      } else {
        res.status(400);
        res.send({ error: 'do not POST to endpoint with /:id (POST creates a new document)' });
      }
      break;
    case 'GET':
      doc = await collection.findOne({ _id: id });
      res.send(doc);
      break;
    case 'PATCH':
      collection.findOneAndUpdate({ _id: id }, { $set: req.body }, { returnOriginal: false })
        .then((document) => {
          res.send(document.value);
        })
        .catch((error) => {
          validateShema(client, req, res, error);
        });
      break;
    case 'DELETE':
      collection.deleteOne({ _id: id })
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(400);
          res.send(error);
        });
      break;
    case 'PUT':
      collection.findOneAndReplace({ _id: id }, req.body, { returnOriginal: false })
        .then((document) => {
          res.send(document.value);
        })
        .catch((error) => {
          validateShema(client, req, res, error);
        });
      break;
    default:
      doc = await collection.findOne({ _id: id });
  }

});

srv.use(errorHandler);

// start the express server
srv.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

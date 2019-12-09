import Ajv from 'ajv';
import bodyParser from 'body-parser';
import express from 'express';
import { MongoClient, Server } from 'mongodb';
import config from './db';
import { initDB } from './initDB';
import { checkCollection, resolveApp, resolveFunction } from './middleware';
import { MongoHelper } from './mongo.helper';

let client: MongoClient;
MongoHelper.connect(config.DBServer).then((res) => {
    client = res;
});

const jsonParser = bodyParser.json();
const srv = express();
const port = 4000;

initDB();

srv.use(jsonParser);
srv.use('/:appName/*', resolveApp);
srv.use('/:appName/functions/:functionName', [resolveFunction, handleFunction]);
srv.use('/:appName/db/:collection/:id*?', [checkCollection]);

function handleFunction(req: express.Request, res: express.Response) {
    res.locals.function(req, res);
}

srv.post('/:appName/db/:collection', (req: express.Request, res: express.Response) => {
    const db = client.db(req.params.appName);
    db.collection(req.params.collection, (error: any, collection: any) => {
        collection.insertOne(req.body, (err: any, dbresp: any) => {
            if (err) {
                validate(req, res, err);
            } else {
                res.send(dbresp.ops[0]);
            }
        });
    });
});

async function validate(req: express.Request, res: express.Response, err: any) {
    res.status(400);
    const schema = await getShema(req.params.db, req.params.collection);
    const data = req.body;
    const ajv = new Ajv();
    const valid = ajv.validate(schema.$jsonSchema, data);
    if (!valid) {
        res.send({ error: err, validationError: ajv.errors });
    } else {
        res.send({ error: err });
    }
}

async function getShema(dbname: string, collection: string) {
    const db = MongoHelper.client.db(dbname);
    const collinfo: any = await db.listCollections({ name: collection }).next();
    return collinfo.options.validator;
}

// start the express server
srv.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

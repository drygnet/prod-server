import Ajv from 'ajv';
import express from 'express';
import { MongoClient } from 'mongodb';

async function validate(client: MongoClient, req: express.Request, res: express.Response, err: any) {
    const schema = await getShema(client, req.params.db, req.params.collection);
    const ajv = new Ajv();
    const valid = ajv.validate(schema.$jsonSchema, req.params.body);
    if (!valid) {
        return ({ error: err, validationError: ajv.errors });
    } else {
        return ({ error: err });
    }
}

async function getShema(client: MongoClient, dbname: string, collection: string) {
    const db = client.db(dbname);
    const collinfo: any = await db.listCollections({ name: collection }).next();
    return collinfo.options.validator;
}

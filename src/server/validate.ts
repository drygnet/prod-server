import Ajv from 'ajv';
import express from 'express';
import { MongoClient } from 'mongodb';

const validateShema = async (client: MongoClient, req: express.Request, res: express.Response, err: any) => {
  const db = client.db(req.params.appName);
  const collinfo: any = await db.listCollections({ name: req.params.collection }).next();
  const schema = collinfo.options.validator;
  const ajv = new Ajv({ allErrors: true });
  const valid = ajv.validate(schema.$jsonSchema, req.body);
  if (!valid) {
    let hint = 'Check your data, (or schema if this is early in development)';
    if (ajv.errors[0].keyword === 'additionalProperties') {
      hint = 'when additionalProperties = false, add "_id: { bsonType: \'objectId\' }" to the schema';
    }
    let validationErrors = ajv.errors;
    if (req.method === 'PATCH') {
      validationErrors = ajv.errors.filter((itm) => itm.keyword !== 'required');
    }
    res.send({ error: err, validationErrors, schema, hint });
  } else {
    res.send({ error: err, schema, body: req.params.body });
  }
};

export default validateShema;

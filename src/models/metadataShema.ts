import { IJsonSchema } from './IJsonSchema';

const userObject: IJsonSchema = {
  bsonType: 'object',
  additionalProperties: false,
  required: ['userId', 'name'],
  properties: {
    userId: { bsonType: 'string' },
    name: { bsonType: 'string' }
  }
};

const metadataSchema: IJsonSchema = {
  bsonType: 'object',
  additionalProperties: false,
  properties: {
    _id: { bsonType: 'objectId' },
    user: userObject,
    date: {
      bsonType: 'string',
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z$'
    }
  },
  required: ['user', 'date']
};

export default metadataSchema;

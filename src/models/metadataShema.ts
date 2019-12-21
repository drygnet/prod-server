import { IJsonSchema } from './IJsonSchema';

const userObject: IJsonSchema = {
  bsonType: 'object',
  additionalProperties: false,
  title: '',
  description: '',
  required: ['id', 'name'],
  properties: {
    id: { bsonType: 'string', title: 'Användar ID', description: 'Användarens unika ID' },
    name: { bsonType: 'string', title: 'Namn', description: 'Användarens för och efternamn' }
  }
};

const metadataSchema: IJsonSchema = {
  bsonType: 'object',
  additionalProperties: false,
  title: 'Metadata',
  description: 'Information om när ett dukument skapades eller uppdaterades',
  properties: {
    _id: { bsonType: 'objectId', title: '', description: '' },
    user: userObject,
    date: {
      title: '',
      description: '',
      bsonType: 'string',
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z$'
    }
  },
  required: ['user', 'date']
};

export default metadataSchema;

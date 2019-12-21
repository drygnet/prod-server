import { IJsonSchema } from './IJsonSchema';

const appSettings: IJsonSchema = {
  bsonType: 'object',
  title: '',
  description: '',
  additionalProperties: false,
  properties: {
    _id: { bsonType: 'objectId', title: '', description: '' },
    key: { bsonType: 'string', title: '', description: '' },
    value: { bsonType: 'string', title: '', description: '' },
    type: { bsonType: 'string', title: '', description: '' }
  },
  required: ['key', 'value', 'type']
};

export default appSettings;

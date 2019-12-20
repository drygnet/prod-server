import { IJsonSchema } from '../../models/IJsonSchema';

const templateItem: IJsonSchema = {
  bsonType: 'object',
  additionalProperties: false,
  properties: {
    title: { bsonType: 'string' }
  },
  required: ['title']
};

export { templateItem };

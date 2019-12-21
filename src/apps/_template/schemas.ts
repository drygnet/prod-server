import { IJsonSchema } from '../../models/IJsonSchema';

const templateItem: IJsonSchema = {
  bsonType: 'object',
  additionalProperties: false,
  title: 'svenskt ord för templateItem',
  description: 'en kollektion av templateItem',
  properties: {
    title: {
      bsonType: 'string',
      title: 'templateItem-Titel',
      description: 'Titelfält för ett templateItem'
    }
  },
  required: ['title']
};

export { templateItem };

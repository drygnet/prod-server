import { IJsonSchema } from '../../models/IJsonSchema';

const tvinnarenCase: IJsonSchema = {
  bsonType: 'object',
  additionalProperties: false,
  title: '',
  description: '',
  properties: {
    _id: { bsonType: 'objectId', title: '', description: '' },
    caseId: { bsonType: 'int', title: '', description: '' },
    status: { enum: ['nytt', 'stängt'], title: '', description: '' },
    subcases: {
      title: '',
      description: '',
      bsonType: 'array',
      items:
      {
        bsonType: 'object',
        title: '',
        description: '',
        additionalProperties: false,
        required: ['status'],
        properties: {
          status: { enum: ['nytt', 'arbetar'], title: '', description: '' }
        }
      }
    },
    title: { bsonType: 'string', title: '', description: '' }
  },
  required: ['caseId', 'title']
};

export { tvinnarenCase };

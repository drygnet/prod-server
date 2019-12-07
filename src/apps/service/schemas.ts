import { IJsonSchema } from '../../models/IJsonSchema';

const case: IJsonSchema = {
    bsonType: 'object',
    properties: {
        title: { bsonType: 'string' }
    },
    required: ['title']
};

export { templateItem };

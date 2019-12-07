import { IJsonSchema } from '../../models/IJsonSchema';

const templateItem: IJsonSchema = {
    bsonType: 'object',
    properties: {
        title: { bsonType: 'string' }
    },
    required: ['title']
};

export { templateItem };

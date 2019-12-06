import { IJsonSchema } from '../../models/jsonSchema';

const schema: IJsonSchema = {
    bsonType: 'object',
    properties: {
        bookingId: { bsonType: 'int' },
        title: { bsonType: 'string' }

    },
    required: ['bookingId', 'title']
};

export default schema;

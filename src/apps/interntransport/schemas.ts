import { IJsonSchema } from '../../models/IJsonSchema';

const transportBooking: IJsonSchema = {
    bsonType: 'object',
    additionalProperties: false,
    properties: {
        bookingId: { bsonType: 'int' },
        title: { bsonType: 'string' }
    },
    required: ['bookingId', 'title']
};

export { transportBooking };

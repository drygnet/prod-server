import { IJsonSchema } from '../../models/IJsonSchema';

const transportBooking: IJsonSchema = {
    bsonType: 'object',
    properties: {
        bookingId: { bsonType: 'int' },
        title: { bsonType: 'string' }
    },
    required: ['bookingId', 'title']
};

export { transportBooking };

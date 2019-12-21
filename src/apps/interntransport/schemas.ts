import { IJsonSchema } from '../../models/IJsonSchema';

const transportBooking: IJsonSchema = {
  bsonType: 'object',
  title: '',
  description: '',
  additionalProperties: false,
  properties: {
    _id: { bsonType: 'objectId', title: '', description: '' },
    bookingId: { bsonType: 'int', title: '', description: '' },
    title: { bsonType: 'string', title: '', description: '' }
  },
  required: ['bookingId', 'title']
};

export { transportBooking };

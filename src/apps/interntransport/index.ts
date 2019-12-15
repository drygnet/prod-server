import { IApp } from './../../models/IApp';
import { transportBooking } from './schemas';

const interntransport: IApp = {
  collections: [
    {
      name: 'bookings',
      schema: transportBooking,
      index: [{ key: { bookingId: 1 }, background: true, unique: false }],
    }
  ]
};

export default interntransport;

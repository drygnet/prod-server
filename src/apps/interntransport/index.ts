import { transportBooking } from './schemas';

const interntransport = {
    collections: [
        {
            name: 'bookings',
            schema: transportBooking
        }
    ]
};

export default interntransport;

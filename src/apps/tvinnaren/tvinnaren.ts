import tvinnarenCase from './schema';

const Tvinnaren = {
    collections: [
        {
            name: 'tvinnarenCase',
            schema: tvinnarenCase
        }
    ],
    greet: () => 'hello from TvI'
};

export default Tvinnaren;

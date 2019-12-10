import { MongoClient } from 'mongodb';
import apps from './apps';

const initDB = (client: MongoClient) => {
    Object.entries(apps).forEach((item) => {
        const [name, app] = item;
        console.info(`INIT ${name}`);
        app.collections.map((col) => {
            console.info(`Creating collection ${name}/${col.name}`);
            if (col.schema) {
                console.info(`Adding schema to collection ${name}/${col.name}`);
            }
        });
    });
};

export { initDB };

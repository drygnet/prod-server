import { MongoClient } from 'mongodb';
import apps from './apps';

const initDB = (client: MongoClient) => {
    Object.entries(apps).forEach((item) => {
        const [name, app] = item;
        console.info(`INIT APP ${name}`);
        const db = client.db(name);
        app.collections.map((col) => {
            console.info(`Creating collection ${name}/${col.name}`);
            db.createCollection(col.name, {
                autoIndexId: true,
                strict: true
            }, (err, collection) => {
                if (err) {
                    console.log(`collection ${col.name} already exists`);
                }
            });
            if (col.schema) {
                console.info(`Adding schema to collection ${name}/${col.name}`);
                db.command({
                    collMod: col.name,
                    validator: { $jsonSchema: col.schema },
                    validationLevel: 'strict'
                }, (err, info) => {
                    if (err) {
                        console.log('ERROR adding schema', err, info);
                    } else {
                        console.log('Schema added');
                    }
                });
            }
        });
    });
};

export { initDB };

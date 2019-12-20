import { MongoClient } from 'mongodb';
import apps from '../apps';
import metadataSchema from '../models/metadataShema';

const initDB = (client: MongoClient) => {
  Object.entries(apps).forEach((item) => {
    const [name, app] = item;
    console.info(`INIT APP ${name}`);
    const db = client.db(name);
    app.collections.map((col: any) => {
      console.info(`Creating collection ${name}/${col.name}`);
      db.createCollection(col.name, {
        strict: true
      }, (err, collection) => {
        if (err) {
          console.log(`collection ${col.name} already exists`);
        }
      });
      if (col.schema) {
        console.info(`Adding schema to collection ${name}/${col.name}`);
        col.schema.properties._created = metadataSchema;
        col.schema.properties._modified = metadataSchema;

        col.schema.required.push('_created', '_modified');
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
      if (col.index) {
        console.log(`Creating index for ${col.name} -> ${col.index}`);
        const collection = db.collection(col.name);
        collection.createIndexes(col.index, async (error, result) => {
          if (error) {
            console.log('Error creating index, attempting drop', JSON.stringify(error));
            await collection.dropIndexes();
            collection.createIndexes(col.index, (error2, result2) => {
              if (error2) {
                console.log('Error creating index (again)', JSON.stringify(error2));
              } else {
                console.log('Creating indexes', result2);
              }
            });
          } else {
            console.log('Creating indexes', result);
          }
        });
      }
    });
  });
};

export { initDB };

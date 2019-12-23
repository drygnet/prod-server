import { MongoClient } from 'mongodb';
import apps from '../apps';
import metadataSchema from '../models/metadataShema';
import appSettings from '../models/settingsSchema';

const initDB = (client: MongoClient) => {
  Object.entries(apps).forEach((item) => {
    const [name, app] = item;
    console.info(`INIT APP ${name}`);
    const db = client.db(name);
    app.collections.push(
      {
        name: 'settings',
        schema: appSettings,
        index: [{ key: { 'key': 1 }, background: false, unique: true }]
      });
    app.collections.map((col: any) => {
      console.info(`Creating collection ${name}/${col.name}`);
      db.createCollection(col.name, {
        strict: true
      }, (err, result) => {
        if (err) {
          if (!err.message.includes('already exists. Currently in strict mode')) {
            console.log(err); // all real errors
          }
        }
        // All the collection stuff in the callback YEY
        if (col.schema) {
          col.schema.properties._created = metadataSchema;
          col.schema.properties._modified = metadataSchema;

          col.index.push({ key: { '_created.date': 1 }, background: true, unique: false });
          col.index.push({ key: { '_modified.date': 1 }, background: true, unique: false });

          col.index.push({ key: { '_created.user.id': 1 }, background: true, unique: false });
          col.index.push({ key: { '_modified.user.name': 1 }, background: true, unique: false });
          col.schema.required.push('_created', '_modified');
          // no duplicate values
          col.schema.required = [...new Set(col.schema.required)];
          db.command({
            collMod: col.name,
            validator: { $jsonSchema: col.schema },
            validationLevel: 'strict'
          }, (schemaError, info) => {
            if (schemaError) {
              console.log('ERROR adding schema', name, col.name, schemaError);
            }
          });
        }
        if (col.index.length > 0) {
          const collection = db.collection(col.name);
          console.log('Creating indexes for ', name, col.name)
          collection.createIndexes(col.index, async (error, indexResult) => {
            if (error) {
              console.log('Error creating index, attempting drop', JSON.stringify(error));
              await collection.dropIndexes();
              collection.createIndexes(col.index, (error2, result2) => {
                if (error2) {
                  console.log('Error creating index (again)', JSON.stringify(error2));
                }
              });
            }
          });
        }
      });  // End of callback
    });
  });
};

export { initDB };

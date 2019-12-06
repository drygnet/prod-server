import express from 'express';
import apps from './apps';
const srv = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
srv.get('/', (req, res) => {
    res.send({ hello: 'world' });
});

srv.get('/:app/db/:collection', (req, res) => {
    const appName = req.params.app;
    const collection = req.params.collection;
    // check that app existes
    if (!(apps as any)[appName]) {
        res.send(`No app named ${appName}`);
        return;
    }

    const app = (apps as any)[appName];

    if (!checkCollection(app, collection)) {
        res.send(`No collection named ${collection}`);
        return;
    }

    res.send(`insert into DB_${appName}, col: ${collection}`);

});

srv.get('/:app/function/:function', (req, res) => {
    const app = req.params.app;
    const fun = req.params.function;
    const response = (apps as any)[app][fun]();
    res.send(response);
});

const checkCollection = (app: any, collection: any) =>
    app.collections.find((col: any) => col.name === collection);

// start the express server
srv.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

import express from 'express';
import apps from './apps';
const srv = express();
const port = 8080; // default port to listen

function resolveApp(req: express.Request, res: express.Response, next: () => void) {
    const appName = req.params.appName;
    if (!(apps as any)[appName]) {
        res.send(`No app named ${appName} !!!`);
        return;
    }
    req.params.app = (apps as any)[appName];
    next();
}

function checkCollection(req: express.Request, res: express.Response, next: () => void) {
    const collection = req.params.collection;
    if (!req.params.app.collections.find((col: any) => col.name === collection)) {
        res.send(`No col named ${collection} !!!`);
        return;
    }
    next();
}

function resolveFunction(req: express.Request, res: express.Response, next: () => void) {
    const app = req.params.app;
    const functionName = req.params.functionName;
    if (!app[functionName]) {
        res.send(`No fun named ${functionName} !!!`);
        return;
    } else {
        req.params.function = app[functionName];
    }
    next();
}

// define a route handler for the default home page
srv.get('/', (req, res) => {
    res.send({ hello: 'world' });
});

srv.get('/:appName/db/:collection', resolveApp, checkCollection, (req, res) => {
    const appName = req.params.appName;
    const collection = req.params.collection;
    res.send(`reading from DB_${appName} / ${collection}`);

});

srv.get('/:appName/function/:functionName', resolveApp, resolveFunction, (req, res) => {
    const response = req.params.function();
    res.send(response);
});

// start the express server
srv.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

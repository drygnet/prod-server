import bodyParser from 'body-parser';
import express from 'express';
import { initDB } from './initDB';
import { checkCollection, resolveApp, resolveFunction } from './middleware';
import { MongoHelper } from './mongo.helper';

const jsonParser = bodyParser.json();
const srv = express();
const port = 4000;

initDB();

srv.use(jsonParser);
srv.use('/:appName/*', resolveApp);
srv.use('/:appName/functions/:functionName', [resolveFunction, handleFunction]);
srv.use('/:appName/db/:collection/:id*?', [checkCollection, handleDb]);

function handleFunction(req: express.Request, res: express.Response) {
    res.locals.function(req, res);
}

function handleDb(req: express.Request, res: express.Response) {
    const appName = res.locals.appName;
    const collection = req.params.collection;
    res.send(`reading from DB_${appName} / ${collection}`);
}

// start the express server
srv.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

srv.on('listening', async () => {
    try {
        await MongoHelper.connect(`mongodb://mongo:27017/`);
    } catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
});

import express from 'express';
import tvinnarenCase from './schema';

const tvinnaren = {
    collections: [
        {
            name: 'tvinnarenCase',
            schema: tvinnarenCase
        }
    ],
    closeCases: (req: express.Request, res: express.Response) => {
        if (req.body.cases) {
            res.send({ action: 'closing', cases: req.body.cases });
        } else {
            res.send({ response: 'hello' });
        }
    }
};

export default tvinnaren;

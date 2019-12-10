import express from 'express';
import { IApp } from './../../models/IApp';
import { tvinnarenCase } from './schemas';

const tvinnaren: IApp = {
    collections: [
        {
            name: 'cases',
            schema: tvinnarenCase,
        },
        {
            name: 'products',
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

import express from 'express';
import apps from '../apps';

const resolveApp = (req: express.Request, res: express.Response, next: () => void) => {
    const appName = req.params.appName;
    console.log('resolveApp', req.params);
    if (!(apps as any)[appName]) {
        res.send(`No app named ${appName} !!!`);
        return;
    }
    res.locals.appName = appName;
    res.locals.app = (apps as any)[appName];
    next();
};

const checkCollection = (req: express.Request, res: express.Response, next: () => void) => {
    const collection = req.params.collection;
    if (!res.locals.app.collections.find((col: any) => col.name === collection)) {
        res.send(`No col named ${collection} !!!`);
        return;
    }
    next();
};

const resolveFunction = (req: express.Request, res: express.Response, next: () => void) => {
    const app = res.locals.app;
    console.log('resolveFun', app);
    const functionName = req.params.functionName;
    if (!app[functionName]) {
        res.send(`No fun named ${functionName} !!!`);
        return;
    } else {
        res.locals.function = app[functionName];
    }
    next();
};

export { resolveApp, resolveFunction, checkCollection };

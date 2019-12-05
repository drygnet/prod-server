import express from "express";
import apps from "./apps";
import Tvinnaren from "./apps/tvinnaren/tvinnaren";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    // tslint:disable-next-line:no-console
    console.log("root");
    // render the index template
    res.send({ hello: "world" });
});

app.get("/:app", (req, res) => {
    // tslint:disable-next-line:no-console
    const application: any = req.params.app;
    const response = `you got ${(apps as any)[req.params.app].greet}`;
    res.send(response);
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

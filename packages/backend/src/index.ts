import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import { config } from "./common/config";
import {errorHandler} from "./common/errors/error-handler";
import createRoutes from "./createRoutes";
import bodyParser from "body-parser";
import { createClient } from 'redis';
import {createConnection} from "./common/redis";

const PORT = config.port;

const app: Application = express();
// @ts-ignore
app.use(bodyParser.urlencoded({ extended: true }));
// @ts-ignore
app.use(bodyParser.json({ type: 'application/json' }));

app.use(morgan("tiny"));
app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

createRoutes(app);

app.use(errorHandler);

// dataSource.initialize().then( () => {
createConnection().then(() => {
    app.listen(PORT, async () => {
        console.log("Server is running on port", PORT);
    });

})

// }).catch((e) => {
//     console.error(`Can't connect to DB!!!`)
//     console.error(e)
//     process.exit(0)
// })

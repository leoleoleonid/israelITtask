import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import { config } from "./common/config";
import {errorHandler} from "./common/errors/error-handler";
import createRoutes from "./createRoutes";
import bodyParser from "body-parser";
import {createConnection} from "./common/redis";
import process from "process";
import cors from 'cors';

const PORT = config.port;

const app: Application = express();
app.use(cors({
    credentials: true,
    "origin": `http://localhost:${process.env.CLIENT_PORT}`,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
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

createConnection().then(() => {
    app.listen(PORT, async () => {
        console.log("Server is running on port", PORT);
    });

})
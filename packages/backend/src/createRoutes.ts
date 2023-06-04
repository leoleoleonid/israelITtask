import {Application} from "express";
import dataRouter from "./modules/data/data.router";

export default function createRoutes(app: Application) {
    app.use('/', dataRouter)
}
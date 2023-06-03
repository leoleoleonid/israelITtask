import {Application} from "express";
import dataRouter from "./modules/data/data.router";
// import authRouter from "./modules/auth/auth.router";

export default function createRoutes(app: Application) {
    app.use('/', dataRouter)
}
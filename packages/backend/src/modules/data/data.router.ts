

// import { validate } from 'class-validator';
// import {ErrorException} from "../../common/errors/error-exception";
// import {ErrorCode} from "../../common/errors/error-code";
// import {plainToClass} from "class-transformer";

import express, {NextFunction, Request, Response} from "express";
import {redisClient} from "../../common/redis";
import {protectedRoute} from "../auth/auth.utils";

const dataRouter = express.Router();

const jwtSecret = 'mcb3DaS05Yvt';
const header = { alg: 'HS256', typ: 'JWT' };
dataRouter.post("/e1", async (req, res, next) => {
    const data = req.body.data;

    await redisClient.RPUSH('mylist', data)
    // await redisClient.LTRIM('mylist', 0, 10000)

    res.send()
});

dataRouter.get("/e2", protectedRoute, async (req, res, next) => {
    // TODO validation
    const page: number = Number(req.query["page"]) || 1;
    const pageSize = 10;
    const from : number = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const result = await redisClient.LRANGE('mylist', from, to)

    res.send(result)
});

export default dataRouter
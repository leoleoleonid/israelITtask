import express from "express";
import {redisClient} from "../../common/redis";
import {protectedRoute} from "../auth/auth.utils";

const dataRouter = express.Router();

const LIST_NAME = 'mylist';

dataRouter.post("/e1", async (req, res, next) => {
    const data = req.body.data;
    await redisClient.RPUSH(LIST_NAME, data)
    // await redisClient.LTRIM(LIST_NAME, 0, 10000)
    res.send()
});

dataRouter.get("/e2", protectedRoute, async (req, res, next) => {
    // TODO validation
    const page: number = Number(req.query["page"]) || 1;
    const pageSize = 10;
    const from : number = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const list = await redisClient.LRANGE(LIST_NAME, from, to)
    const listTotalLength = await redisClient.LLEN(LIST_NAME);
    const totalPages = Math.ceil(listTotalLength/10);
    // console.log('listLength', listTotalLength, 'totalPages', totalPages);

    res.send({list, totalPages})
});

export default dataRouter
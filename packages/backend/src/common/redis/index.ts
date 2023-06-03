import {createClient} from "redis";
import {config} from "../config";

export const redisClient= createClient(
    {
        url:  config.redisUrl
    }
);

export const createConnection = async () => {
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect();
    console.log('Redis connected successfully!')
}
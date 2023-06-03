

// import { validate } from 'class-validator';
// import {ErrorException} from "../../common/errors/error-exception";
// import {ErrorCode} from "../../common/errors/error-code";
// import {plainToClass} from "class-transformer";

import express, {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

const jwtSecret = 'mcb3DaS05Yvt';
const header = { alg: 'HS256', typ: 'JWT' };

export const validate = (req: Request, res: Response, next: NextFunction) => {
    jwt.verify(req.body.token , jwtSecret, /*{header},*/ (err, decoded) => {
        if (err) {
            throw 'SHIIIIIT'
        }

        console.log(decoded);
        // req['user'] = decoded;
        next();
    })
}




authRouter.get("/generateToken", async (req, res, next) => {
    const payload = { user: 'John Doe' };

    const token = jwt.sign(payload, jwtSecret, { header }, (err, token) => {
        console.dir(err)
        console.log(token);
        return  res.send({token});
    });

});
authRouter.post("/validate", validate, async (req, res, next) => {
    // console.log(req["user"]);
    // res.send(req["user"]);
});

export default authRouter
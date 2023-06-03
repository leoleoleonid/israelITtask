import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {ErrorException} from "../../common/errors/error-exception";
import {ErrorCode} from "../../common/errors/error-code";

const jwtSecret = 'mcb3DaS05Yvt';
const header = { alg: 'HS256', typ: 'JWT' };

export const generateTokenSync = () => {
    const payload = { user: 'John Doe' };
    const token = jwt.sign(payload, jwtSecret, { header });
    console.log(token)
    verifyToken(token).then((data) => {
      console.log( " resolved data", data)
    })
}

export const verifyToken = async (token: string): Promise<JwtPayload | string | undefined> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token , jwtSecret,(err: VerifyErrors | null, decoded) => {
            if (err) {
                reject(err)
            }
            console.log(decoded);
            resolve(decoded)
        })
    })
}

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return next(new ErrorException(ErrorCode.Unauthenticated, 'No JWT TOKEN'))
    }
    try {
        await verifyToken(token)
        next();
    } catch (e) {
        return next(new ErrorException(ErrorCode.Unauthenticated, 'Token is not valid'))
    }
}
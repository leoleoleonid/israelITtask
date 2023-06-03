import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from './error-code';
import { ErrorException } from './error-exception';
import { ErrorModel } from './error-model';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Path:', req.path);
  console.error('Error occurred:', err);
  console.log(err.name, err instanceof ErrorException)
  if (err instanceof ErrorException) {
    res.status(err.status).send(err);
  } else {
    res.status(500).send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
  }
};

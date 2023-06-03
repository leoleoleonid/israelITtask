import express from "express";
import UserController from "./user.controller";
import { validate } from 'class-validator';
import {CreateUserDto} from "./user.dto";
import {ErrorException} from "../../common/errors/error-exception";
import {ErrorCode} from "../../common/errors/error-code";
import {plainToClass} from "class-transformer";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const userDto = plainToClass(CreateUserDto, req.body);
  const errors = await validate(userDto);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.ValidationError, errors));
  }
  const controller = UserController.createInstance();
  const response = await controller.create(req.body);
  return res.send(response);
});

export default router
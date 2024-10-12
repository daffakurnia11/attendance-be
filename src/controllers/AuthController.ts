import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { BadRequestError } from "../middlewares/errorHandler";
import { AUTH_MESSAGE } from "../utils/message";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.register(req.body);

      if (req.body.password !== req.body.confirm_password) {
        throw new BadRequestError(AUTH_MESSAGE.PASSWORD_NOT_MATCH);
      }
      res.created(AUTH_MESSAGE.REGISTERED, data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

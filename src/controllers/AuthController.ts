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

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token, refresh_token, user } = await AuthService.login(
        req,
        res,
        next
      );
      res.success(AUTH_MESSAGE.LOGIN, { token: access_token, user }, refresh_token);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

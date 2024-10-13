import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { USER_MESSAGE } from "../utils/message";
import { User } from "../models/Users";

class UserController {
  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await req.user as User;
      const user = await UserService.getUserByFilter("id", data.id!);

      res.success(USER_MESSAGE.GET_USER, user);
    } catch (error) {
      next(error);
    }
  }

  public async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await req.user as User;
      const user = await UserService.updateProfile(data.id!, req.body);

      res.success(USER_MESSAGE.UPDATED_PROFILE, user);
    } catch (error) {
      next(error);
    }
  }

  public async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await req.user as User;
      const user = await UserService.updatePassword(
        data.id!,
        req.body.old_password,
        req.body.new_password
      );

      res.success(USER_MESSAGE.UPDATED_PASSWORD, user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

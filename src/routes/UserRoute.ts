import express from "express";
import type { Router } from "express";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
import UserValidator from "../validators/UserValidator";
import { handleValidation } from "../middlewares/validate";

class UserRoute {
  public router: Router;
  private controller: any = UserController;
  private validator: any = UserValidator;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/profile",
      auth,
      this.controller.getUser
    );

    this.router.patch(
      "/profile",
      auth,
      this.validator.updateProfile,
      handleValidation,
      this.controller.updateProfile
    );

    this.router.patch(
      "/password",
      auth,
      this.validator.changePassword,
      handleValidation,
      this.controller.updatePassword
    );
  }
}

export default new UserRoute();
import express from "express";
import type { Router } from "express";
import { handleValidation } from "../middlewares/validate";
import AuthController from "../controllers/AuthController";
import AuthValidator from "../validators/AuthValidator";

class AuthRoute {
  public router: Router;
  private controller: any = AuthController;
  private validator: any = AuthValidator;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/register",
      this.validator.register,
      handleValidation,
      this.controller.register
    );
  }
}

export default new AuthRoute();

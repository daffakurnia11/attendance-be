import express from "express";
import type { Router } from "express";
import AttendanceController from "../controllers/AttendanceController";
import auth from "../middlewares/auth";
import AttendanceValidator from "../validators/AttendanceValidator";
import { handleValidation } from "../middlewares/validate";

class AttendanceRoute {
  public router: Router;
  private controller: any = AttendanceController;
  private validator: any = AttendanceValidator;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.controller.findAll);

    this.router.get("/:id", auth, this.controller.findById);
    
    this.router.post(
      "/",
      auth,
      this.validator.create,
      handleValidation,
      this.controller.create
    );
  }
}

export default new AttendanceRoute();

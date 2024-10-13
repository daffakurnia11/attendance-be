import { body } from "express-validator";

class AttendanceValidator {
  public create = [
    body("latitude").exists().withMessage("Latitude is required"),
    body("longitude").exists().withMessage("Longitude is required"),
    body("ip_address").exists().withMessage("IP address is required"),
    body("photo").exists().withMessage("Photo is required"),
  ]
}

export default new AttendanceValidator();
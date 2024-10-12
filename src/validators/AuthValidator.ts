import { body } from "express-validator";

class AuthValidator {
  public register = [
    body("name").exists().withMessage("Name is required"),
    body("email").exists().withMessage("Email is required"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirm_password")
      .exists()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ];
}

export default new AuthValidator();

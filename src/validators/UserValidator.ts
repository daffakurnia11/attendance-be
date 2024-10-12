import { body } from "express-validator";

class UserValidator {
  public updateProfile = [
    body("name").exists().withMessage("Name is required"),
    body("email").exists().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  ]

  public changePassword = [
    body("old_password")
      .exists()
      .withMessage("Old password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("new_password")
      .exists()
      .withMessage("New password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirm_password")
      .exists()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.new_password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ]
}

export default new UserValidator();
import bcrypt from "bcryptjs";
import { User } from "../models/Users";
import UserRepository from "../repositories/UserRepository";
import { v7 as uuidv7 } from "uuid";
import { BadRequestError } from "../middlewares/errorHandler";
import { AUTH_MESSAGE, ERROR_MESSAGE } from "../utils/message";

class AuthService {
  private saltRounds = 10;

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  private async getUserByEmail(email: string): Promise<User> {
    const user = await UserRepository.findByFilter("email", email);
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGE.NOT_FOUND);
    }

    const { password, ...response } = user;

    return response;
  }

  public async register(data: User): Promise<User> {
    const { name, email, password } = data;

    const emailExists = await UserRepository.findByFilter("email", email);
    if (emailExists) {
      throw new BadRequestError(AUTH_MESSAGE.EMAIL_EXIST);
    }

    const id = uuidv7();
    const encryptedPassword = await this.encryptPassword(password!);

    await UserRepository.create({
      id,
      name,
      email,
      password: encryptedPassword,
    });

    return this.getUserByEmail(email);
  }
}

export default new AuthService();

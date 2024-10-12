import { BadRequestError } from "../middlewares/errorHandler";
import { User } from "../models/Users";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import { ERROR_MESSAGE, USER_MESSAGE } from "../utils/message";

class UserService {
  private saltRounds = 10;

  private async findUser(key: string, value: string): Promise<User> {
    const user = await UserRepository.findByFilter(key, value);
    if (!user) {
      throw new BadRequestError(ERROR_MESSAGE.NOT_FOUND);
    }
    return user;
  }

  public async getUserByFilter(
    key: string,
    value: string
  ): Promise<User | null> {
    const { password, ...user } = await this.findUser(key, value);
    return user;
  }

  public async updateProfile(id: string, { name, email }: User): Promise<void> {
    const user = await this.findUser("id", id);

    if (user.email !== email) {
      const emailExists = await UserRepository.findByFilter("email", email);
      if (emailExists) {
        throw new BadRequestError(USER_MESSAGE.EMAIL_EXIST);
      }
    }

    await UserRepository.update(id, { name, email });
  }

  public async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.findUser("id", id);

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password!
    );
    if (!isPasswordValid) {
      throw new BadRequestError(USER_MESSAGE.INCORRECT_PASSWORD);
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      this.saltRounds
    );

    await UserRepository.update(id, { ...user, password: hashedPassword });
  }
}

export default new UserService();

import bcrypt from "bcryptjs";
import type { User } from "../models/Users";
import UserRepository from "../repositories/UserRepository";
import { v7 as uuidv7 } from "uuid";
import {
  AuthenticationError,
  BadRequestError,
  InternalServerError,
} from "../middlewares/errorHandler";
import { AUTH_MESSAGE, ERROR_MESSAGE } from "../utils/message";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

class AuthService {
  private saltRounds = 10;

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  public async getUserByFilter(key: string, value: string): Promise<User> {
    const user = await UserRepository.findByFilter(key, value);
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

    return this.getUserByFilter("email", email);
  }

  private async generateToken(user: User) {
    const accessToken = jwt.sign(user, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const refreshToken = jwt.sign(user, jwtConfig.refreshSecret, {
      expiresIn: jwtConfig.refreshExpiresIn,
    });

    return {
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "local",
        { session: false },
        async (
          err: { message: string },
          user: User,
          info: { message: string }
        ) => {
          try {
            if (err) {
              return reject(new InternalServerError(err.message));
            }
            if (!user) {
              return reject(new AuthenticationError(info.message));
            }

            const { access_token, refresh_token } = await this.generateToken(
              user
            );
            resolve({ access_token, refresh_token, user });
          } catch (error) {
            reject(error);
          }
        }
      )(req, res, next);
    });
  }
}

export default new AuthService();

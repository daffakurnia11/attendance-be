import type { BaseModel } from "./Base";

export interface User extends BaseModel {
  name: string;
  email: string;
  password?: string;
}

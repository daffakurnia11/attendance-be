import { BaseModel } from "./Base";

export interface Attendance extends BaseModel {
  user_id: string;
  latitude: string;
  longitude: string;
  ip_address: string;
  photo: string;
}
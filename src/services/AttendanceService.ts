import { BadRequestError } from "../middlewares/errorHandler";
import { Attendance } from "../models/Attendances";
import AttendanceRepository from "../repositories/AttendanceRepository";
import { v7 as uuidv7 } from "uuid";

class AttendanceService {
  public async findAll(): Promise<Attendance[]> {
    const attendances = await AttendanceRepository.findAll();
    return attendances;
  }

  public async filterByKeys(
    filters: Record<string, string>
  ): Promise<Attendance[]> {
    const validKeys = ["name", "email", "created_at"];

    for (const key of Object.keys(filters)) {
      if (!validKeys.includes(key)) {
        throw new BadRequestError(`Unsupported filter key: ${key}`);
      }
    }

    const attendances = await AttendanceRepository.filterByKeys(filters);
    return attendances;
  }

  public async findById(value: string): Promise<Attendance | null> {
    const attendance = await AttendanceRepository.findById(value);
    return attendance;
  }

  public async create(attendance: Attendance): Promise<void> {
    const id = uuidv7();
    await AttendanceRepository.create({ id, ...attendance });
  }
}

export default new AttendanceService();

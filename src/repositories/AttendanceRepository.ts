import knex from "../config/database";
import { Attendance } from "../models/Attendances";

class AttendanceRepository {
  protected tableName: string;

  constructor() {
    this.tableName = "attendances";
  }

  private selectQuery() {
    let queryBuilder = knex(this.tableName).select(
      "attendances.id as attendance_id",
      "attendances.latitude",
      "attendances.longitude",
      "attendances.ip_address",
      "attendances.photo",
      "attendances.created_at as created_at",
      "attendances.updated_at as updated_at",
      "attendances.deleted_at as deleted_at",
      "users.id as user_id",
      "users.name as user_name",
      "users.email as user_email"
    );

    return queryBuilder;
  }

  public async findAll(): Promise<Attendance[]> {
    const attendances = await this.selectQuery().join(
      "users",
      "attendances.user_id",
      "=",
      "users.id"
    );

    return attendances;
  }

  public async filterByKeys(
    filters: Record<string, string>
  ): Promise<Attendance[]> {
    const query = this.selectQuery().join(
      "users",
      "attendances.user_id",
      "=",
      "users.id"
    );

    for (const [key, value] of Object.entries(filters)) {
      if (key === "created_at") {
        query.where("attendances.created_at", ">=", value[0]);
        query.where("attendances.created_at", "<=", value[1]);
      } else {
        query.where(`users.${key}`, "ilike", `%${value}%`);
      }
    }

    const attendances = await query;
    return attendances;
  }

  public async findById(value: string): Promise<Attendance> {
    const attendance = await this.selectQuery()
      .join("users", "attendances.user_id", "=", "users.id")
      .where(`attendances.id`, value)
      .first();

    return attendance;
  }

  public async create(attendance: Attendance): Promise<void> {
    await knex(this.tableName).insert(attendance);
  }
}

export default new AttendanceRepository();

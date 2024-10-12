import knex from "../config/database";
import { User } from "../models/Users";

class UserRepository {
  protected tableName: string;

  constructor() {
    this.tableName = "users";
  }

  private selectQuery() {
    let queryBuilder = knex(this.tableName).select();

    return queryBuilder;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.selectQuery();
    return users;
  }

  public async findByFilter(key: string, value: string): Promise<User | null> {
    const user = await this.selectQuery()
      .where({ [key]: value })
      .first();
    if (!user) {
      return null;
    }
    return user;
  }

  public async create(user: User): Promise<void> {
    await knex(this.tableName).insert(user);
  }

  public async update(id: string, user: User): Promise<void> {
    await knex(this.tableName).where({ id }).update(user);
  }

  public async softDelete(id: string): Promise<void> {
    await knex(this.tableName)
      .where({ id })
      .update({ deleted_at: knex.fn.now() });
  }

  public async hardDelete(id: string): Promise<void> {
    await knex(this.tableName).where({ id }).delete();
  }
}

export default new UserRepository();

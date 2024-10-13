import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("attendances", (table) => {
    table.uuid("id").primary().notNullable();
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table.string("latitude").notNullable();
    table.string("longitude").notNullable();
    table.string("ip_address").notNullable();
    table.text("photo").notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("attendances");
}

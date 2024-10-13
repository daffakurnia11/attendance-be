import { Knex } from "knex";
import bcrypt from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import { firstImage, secondImage } from "../utils/imageSeeder";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("attendances").del();
  await knex("users").del();

  const firstId = uuidv7();
  const secondId = uuidv7();

  const password = await bcrypt.hash("password", 12);

  // Inserts seed entries
  await knex("users").insert([
    { id: firstId, name: "AC", email: "ac@test.com", password },
    {
      id: secondId,
      name: "Kipas Angin",
      email: "kipasangin@test.com",
      password,
    },
  ]);

  await knex("attendances").insert([
    {
      id: uuidv7(),
      user_id: firstId,
      latitude: "0.0",
      longitude: "0.0",
      ip_address: "0.0.0.0",
      photo: firstImage,
      created_at: new Date("2024-10-11"),
      updated_at: new Date("2024-10-11"),
    },
    {
      id: uuidv7(),
      user_id: secondId,
      latitude: "0.0",
      longitude: "0.0",
      ip_address: "0.0.0.0",
      photo: secondImage,
      created_at: new Date("2024-10-11"),
      updated_at: new Date("2024-10-11"),
    },
    {
      id: uuidv7(),
      user_id: firstId,
      latitude: "0.0",
      longitude: "0.0",
      ip_address: "0.0.0.0",
      photo: firstImage,
      created_at: new Date("2024-10-12"),
      updated_at: new Date("2024-10-12"),
    },
    {
      id: uuidv7(),
      user_id: secondId,
      latitude: "0.0",
      longitude: "0.0",
      ip_address: "0.0.0.0",
      photo: secondImage,
      created_at: new Date("2024-10-12"),
      updated_at: new Date("2024-10-12"),
    },
    {
      id: uuidv7(),
      user_id: firstId,
      latitude: "0.0",
      longitude: "0.0",
      ip_address: "0.0.0.0",
      photo: firstImage,
      created_at: new Date("2024-10-13"),
      updated_at: new Date("2024-10-13"),
    },
    {
      id: uuidv7(),
      user_id: secondId,
      latitude: "0.0",
      longitude: "0.0",
      ip_address: "0.0.0.0",
      photo: secondImage,
      created_at: new Date("2024-10-13"),
      updated_at: new Date("2024-10-13"),
    },
  ]);
}

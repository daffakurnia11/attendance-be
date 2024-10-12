import knex from 'knex';
import { config } from '.';

const db = knex({
  client: 'pg',
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: Number(config.db.port) || 5432
  },
  pool: {
    min: 2,
    max: 10,
  },
});

export default db;

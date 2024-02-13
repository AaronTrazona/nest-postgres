import * as dotenv from 'dotenv'; 
import type { Knex } from "knex";

dotenv.config();  // Load environment variables from .env file 
const config: Knex.Config = {
  client: "postgresql",
  connection: {
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT)
  },
  migrations: {
    directory: 'database/migrations',
    tableName: 'knex_migrations'
  }
}

const connectionPool = {
  pool: {
    min: parseInt(process.env.MIN_CONNECTION_POSTGRES),
    max: parseInt(process.env.MAX_CONNECTION_POSTGRES)
  }
}

const envConfig: { [key: string]: Knex.Config } = {
  development: config,

  staging: {
    ...config,
    ...connectionPool,
  },

  production: {
    ...config,
    ...connectionPool,
  },
};

module.exports = envConfig;

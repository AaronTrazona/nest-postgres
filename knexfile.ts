import * as dotenv from 'dotenv'; 
import type { Knex } from "knex";
import { knexSnakeCaseMappers } from 'objection';

dotenv.config();  // Load environment variables from .env file 
const config: Knex.Config = {
  client: "postgresql",
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT)
  },
  migrations: {
    directory: 'database/migrations',
    tableName: 'knex_migrations',
    stub: 'database/migration.stub'
  },
  seeds: {
    directory: 'database/seeds',
    stub: 'database/seed.stub',
    timestampFilenamePrefix: true
  },
  ...knexSnakeCaseMappers()
}

const connectionPool = {
  pool: {
    min: Number(process.env.MIN_CONNECTION_POSTGRES) || 2 ,
    max: Number(process.env.MAX_CONNECTION_POSTGRES) || 10
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

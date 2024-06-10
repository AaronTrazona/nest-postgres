import * as Knex from "knex";
import { Model, knexSnakeCaseMappers } from "objection";

export const postgresFactory = () => {
    const knex = Knex({
        client: "postgresql",
        connection: {
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          database: process.env.POSTGRES_DB,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
        },
        pool: { 
            min: parseInt(process.env.MIN_CONNECTION_POSTGRES),
            max: parseInt(process.env.MAX_CONNECTION_POSTGRES)
        },
        ...knexSnakeCaseMappers()
    });

    Model.knex(knex);

    return knex;
}
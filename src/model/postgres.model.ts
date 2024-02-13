import { Injectable } from "@nestjs/common";
import { Model } from "objection"
import * as KnexConfig from "knex";
import { Knex } from "knex/types"

@Injectable()
export class PostgresModel { 
    private knex: Knex

    constructor() {
        this.knex = KnexConfig({
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
        });

        Model.knex(this.knex);
    }


    shutdown() {
        if (this.knex) {
            this.knex.destroy()
        }
    }
}

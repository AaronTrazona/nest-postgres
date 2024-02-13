import { tableTrigger } from "../utils";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "moddatetime"');
    await knex.schema.createTable("notes", (table) => {
        table.uuid("id", { useBinaryUuid: true, primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("title").defaultTo("").notNullable();
        table.string("body").defaultTo("").notNullable();
        table.timestamps(true, true);
    });
    await knex.raw(tableTrigger("notes", "updated_at"));
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("notes");
    await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
    await knex.raw('DROP EXTENSION IF EXISTS "moddatetime"');
}

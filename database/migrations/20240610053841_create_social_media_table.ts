import { tableTrigger } from "../utils";
import type { Knex } from "knex";

const tableName = 'social_media'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name").notNullable();
        table.string("link").notNullable();
        table.timestamps(true, true);
    });

    // the purpose to make updated_at column to update the date if row is updated.
    await knex.raw(tableTrigger(tableName, "updated_at"));
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName);
}

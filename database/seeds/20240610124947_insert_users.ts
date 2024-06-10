import { Knex } from "knex";

const tableName = 'users'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert([
        {
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@boilerplate.com",
            password: "$2a$12$TGgGwGGMf9EyVVoNwkdjAOK6UQqbMtg2rOud/YqojJ2tKUzO1IOLe",
            role: "Guest",
        },
    ]);
};

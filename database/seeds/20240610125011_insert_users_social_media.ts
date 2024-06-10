import { Knex } from "knex";

const tableName = 'users_social_media'

type User = {
    id: string
    email: string
}

type SocialMedia = {
    id: string,
    name: string
}

type UserSocialMedia = {
    user_id: string
    social_media_id: string
}

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    const user = await knex<User>("users").where({
        email: "johndoe@boilerplate.com"
    }).select("*").first();

    if (!user) return;

    const social_media = await knex<SocialMedia>("social_media").whereIn("name", ["Facebook", "Youtube", "LinkedIn"]).select("*");
    const payload = social_media.map<UserSocialMedia>((each) => ({
        user_id: user.id,
        social_media_id: each.id
    }))

    if (!payload.length) return;

    // Inserts seed entries
    await knex(tableName).insert(payload);
};

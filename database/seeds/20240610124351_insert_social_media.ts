import { Knex } from "knex";

const tableName = 'social_media'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert([
        { name: "Facebook", link: "https://www.facebook.com/" },
        { name: "WhatsApp", link: "https://www.whatsapp.com/" },
        { name: "Youtube", link: "https://www.youtube.com/" },
        { name: "Instagram", link: "https://www.instagram.com/" },
        { name: "WeChat", link: "https://www.wechat.com/" },
        { name: "TikTok", link: "https://www.tiktok.com/" },
        { name: "Telegram", link: "https://telegram.org/" },
        { name: "Snapchat", link: "https://www.snapchat.com/" },
        { name: "Pinterest", link: "https://www.pinterest.com/" },
        { name: "Twitter", link: "https://x.com/" },
        { name: "Reddit", link: "https://www.reddit.com/" },
        { name: "LinkedIn", link: "https://www.linkedin.com/" },
        { name: "Quora", link: "https://www.quora.com/" },
        { name: "Discord", link: "https://discord.com/" },
        { name: "Twitch", link: "https://www.twitch.tv/" },
        { name: "Tumblr", link: "https://www.tumblr.com/" },
    ]);
};

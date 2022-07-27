import { Bot } from "https://deno.land/x/grammy@v1.9.2/mod.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") ?? "");

bot.command("start", async (ctx) => {
  await ctx.reply("Hello!");
});

bot.command("ping", async (ctx) => {
  await ctx.reply("Pong!");
});

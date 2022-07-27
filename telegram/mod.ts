import { serve } from "https://deno.land/std@0.149.0/http/mod.ts";
import { webhookCallback } from "https://deno.land/x/grammy@v1.9.2/mod.ts";
import { bot } from "./bot.ts";

await bot.init();

const handleUpdate = webhookCallback(bot, "std/http");
serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  switch (pathname) {
    case `/${bot.token}`:
      if (req.method === "POST") {
        try {
          return await handleUpdate(req);
        } catch (err) {
          console.error(err);
          return new Response();
        }
      }
      break;

    default:
      return Response.redirect(`https://telegram.me/${bot.botInfo.username}`);
  }
});

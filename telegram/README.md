# Telegram Bot

A simple Telegram bot built with [grammY](https://grammy.dev).

## Tutorial

1. Deploy the Bot.

   [![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/denoland/deploy_examples/main/telegram/mod.ts&env=BOT_TOKEN)
2. Open Telegram, talk to [BotFather](https://telegram.me/BotFather) and grab a
   bot token. Set it as the `BOT_TOKEN` environment variable value.
3. Click on **Create** to create the project, then on **Deploy** to deploy the
   script.
4. Visit the following URL (make sure to replace the template fields):
   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=<APP_URL>/<YOUR_TOKEN>
   ```

   - Replace `<YOUR_TOKEN>` with the token you got earlier.
   - Replace `<APP_URL>` with the the URL that is displayed under the
     **Production Deployment** card at your project dashboard page.
5. Now send the bot a `/start` or `/ping` command.

<img align="center" src="preview.png" alt="demo of Telegram Bot Command" />

## Run Locally

You can run the example on your machine using [Deno CLI](https://deno.land).

```sh
BOT_TOKEN="<YOUR_TOKEN>" deno run --allow-env --allow-net https://raw.githubusercontent.com/denoland/deploy_examples/main/telegram/local.ts
```

Remember to replace the `<YOUR_TOKEN>` with your own bot token.

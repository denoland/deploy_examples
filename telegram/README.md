# Telegram Bot Command

A simple Telegram Bot Command.

## Tutorial

1. Follow the
   [official Telegram guide](https://core.telegram.org/bots#3-how-do-i-create-a-bot)
   for creating a Bot.
2. Deploy the Bot by clicking on this button:
   [![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/denoland/deploy_examples/main/telegram/mod.ts&env=TOKEN,BOT_NAME)
3. Input `TOKEN` and `BOT_NAME` env variable fields. The token value should be
   available from the BotFather and the value `BOT_NAME` is the bot username
   that ends with either `_bot` or `Bot`.
4. Click on **Create** to create the project, then on **Deploy** to deploy the
   script.
5. Grab the URL that's displayed under Domains in the Production Deployment
   card.
6. Visit the following URL (make sure to replace the template fields):
   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=<DOMAIN_NAME>/<YOUR_TOKEN>
   ```

   > Replace <YOUR_TOKEN> with the token from the BotFather and `<DOMAIN_NAME>`
   > with the URL from the previous step.

7. Add a command to the bot by visiting the following URL:

   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/setMyCommands?commands=[{"command":"ping","description":"Should return a 'pong' from the Bot."}]
   ```
8. Now you can invite the bot to a Group Chat or just PM the bot with the
   following command "/ping".

<img align="center" src="demo.png" alt="demo of Telegram Bot Command" />

## Run Offline

You can run the example program on your machine using
[`deno`](https://github.com/denoland/deno):

```sh
TOKEN=<your_telegram_bot_token> BOT_NAME=<bot_username> deno run --allow-env --allow-net https://raw.githubusercontent.com/denoland/deploy_examples/main/telegram/mod.ts
```

You need to use a tool like [ngrok](https://ngrok.com) to tunnel Telegram
requests to the app running on your machine.

1. Run `ngrok http 8080` (assuming that the application is running on port
   `8080`)
2. While registering the bot, use the https URL output by ngrok for **url**
   query.

> Example:
> `https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=<ngrok_url>/<YOUR_TOKEN>`

That's it.

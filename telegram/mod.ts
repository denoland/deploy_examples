import {
  json,
  PathParams,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.4.2/mod.ts";

// For all requests to "/<TOKEN>" endpoint, we want to invoke handleTelegram() handler.
// Recommend using a secret path in the URL, e.g. https://www.example.com/<token>.
serve({
  "/": () => new Response("Welcome to the Telegram Bot site."),
  "/:slug": handleTelegram,
});

// The main logic of the Telegram bot is defined in this function.
async function handleTelegram(request: Request, params?: PathParams) {
  // Gets the environment variable TOKEN
  const TOKEN = Deno.env.get("TOKEN")!;
  // Gets the environment variable BOT_NAME
  const BOT_NAME = Deno.env.get("BOT_NAME")!;

  // If the environment variable TOKEN is not found, throw an error.
  if (!TOKEN) {
    throw new Error("environment variable TOKEN is not set");
  }

  // For using a secret path in the URL, e.g. https://www.example.com/<token>. If wrong url return "invalid request".
  if (params?.slug != TOKEN) {
    return json(
      { error: "invalid request" },
      {
        status: 401,
      },
    );
  }

  // Make sure the request is a POST request.
  const { error } = await validateRequest(request, {
    POST: {},
  });

  // validateRequest populates the error if the request doesn't meet
  // the schema we defined.
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  // Get the body of the request
  const body = await request.text();
  // Parse the raw JSON body from Telegrams webhook.
  const data = await JSON.parse(body);

  // Check if the method is a POST request and that there was somthing in the body.
  if (request.method === "POST") {
    // Cheack if the command was "/ping".
    if (
      data && data["message"] && data["message"]["text"] &&
      (data["message"]["text"].toLowerCase() == "/ping" ||
        data["message"]["text"].toLowerCase() ==
          "/ping@" + BOT_NAME.toLowerCase())
    ) {
      // Store the chat id of the Group Chat, Channel or PM.
      const chatId: number = data["message"]["chat"]["id"];

      // Calls the API service to Telegram for sending a message.
      const { dataTelegram, errors } = await sendMessage(
        chatId,
        "Pong",
        TOKEN,
      );

      if (errors) {
        console.error(errors.map((error) => error.message).join("\n"));
        return json({ error: "couldn't create the message" }, {
          status: 500,
        });
      }

      // Returns the answer and set status code 201.
      return json({ dataTelegram }, { status: 201 });
    }
    // Returns empty object and set status code 200.
    return json({}, { status: 200 });
  }

  // We will return a bad request error as a valid Telegram request
  // shouldn't reach here.
  return json({ error: "bad request" }, { status: 400 });
}

/** What to store for an error message. */
type TelegramError = {
  message?: string;
};

/** Sending a POST request to Telegram's API to send a message. */
async function sendMessage(
  chatId: number,
  text: string,
  token: string,
): Promise<{
  dataTelegram?: unknown;
  errors?: TelegramError[];
}> {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      },
    );
    const { dataTelegram, errors } = await res.json();

    if (errors) {
      return { dataTelegram, errors };
    }

    return { dataTelegram };
  } catch (error) {
    console.error(error);
    return { errors: [{ message: "failed to fetch data from Telegram" }] };
  }
}

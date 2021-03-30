/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.1.6/mod.ts";
import { getCardinal } from "https://deno.land/x/cardinal@0.1.0/mod.ts";
import { getRandomCity } from "./cities.ts";

async function handleRequest(request: Request) {
  // validateRequest() ensures that incoming requests are of methods POST and GET.
  // Slack sends a POST request with a form field named text that contains the
  // information provided by user. We're allowing GET for anyone visiting the
  // endpoint in browser. You can disallow GET for your application as it is
  // not required by Slack.
  const { error } = await validateRequest(request, {
    GET: {},
    POST: {},
  });
  if (error) {
    // validateRequest() generates appropriate error and status code when
    // the request isn't valid. We return that information in a format that's
    // appropriate for Slack but there's a good chance that we will not
    // encounter this error if the request is actually coming from Slack.
    return json(
      // "ephemeral" indicates that the response is short-living and is only
      // shown to user who invoked the command in Slack.
      { response_type: "ephemeral", text: error.message },
      { status: error.status },
    );
  }

  // If a user is trying to visit the endpoint in a browser, let's return a html
  // page instructing the user to visit the GitHub page.
  if (request.method === "GET") {
    return new Response(
      `<body
        align="center"
        style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
      >
        <p>
          Visit <a href="https://github.com/denoland/deploy_examples/tree/main/weather">GitHub</a> 
          page for instructions on how to install this Slash Command on your Slack workspace.
        </p>
      </body>`,
      {
        headers: {
          "content-type": "text/html; charset=UTF-8",
        },
      },
    );
  }

  // We use openweathermap.org for weather information and need an API
  // token to access their API. The API token is set in Deno Deploy
  // dashboard in the "Environment Variables" section, and accessed
  // as an environment variable in code.
  const token = Deno.env.get("OPEN_WEATHER_TOKEN");
  if (!token) {
    return json({
      response_type: "ephemeral",
      text: "Environment variable `OPEN_WEATHER_TOKEN` not set.",
    });
  }

  try {
    const formData = await request.formData();
    // The text after command (`/weather <text>`) is passed on to us by Slack in a form
    // field of the same name in the request.
    if (!formData.has("text")) {
      return json(
        { response_type: "ephemeral", text: "form field `text` not provided" },
        { status: 400 },
      );
    }

    // We gather location name from `text` field and construct the
    // request URL to fetch weather information.
    const location = formData.get("text")!.toString().trim();
    let url =
      `https://api.openweathermap.org/data/2.5/weather?appid=${token}&units=metric`;
    if (location) {
      url += `&q=${encodeURIComponent(location)}`;
    } else {
      // If the user didn't provide a city name, we get random city from the list of
      // most populated cities.
      url += `&id=${getRandomCity().id}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      // The request might not succeed for several reason but let's just
      // return a generic error for simplicity.
      return json(
        {
          response_type: "ephemeral",
          text: `Error fetching weather information for \`${location}\`.`,
        },
        { status: 500 },
      );
    }

    // Some of the variables name here might not make sense but it is the
    // response structure of openweathermaps.org. You can read more about
    // the fields at https://openweathermap.org/current#current_JSON.
    const {
      dt,
      name: city,
      sys,
      main: { humidity, temp, feels_like: feelsLike },
      wind: { speed: windSpeed, deg: windDegree },
      weather,
      visibility,
    } = await response.json();

    // We get a short code (SE for South East) for the wind direction
    // based on its degree.
    const windDirection = getCardinal(windDegree);
    // For simplicity, let's just show the time information in
    // UTC. The better approach would be to find and use the
    // time zone of the location provided by the user.
    const timeOptions: Intl.DateTimeFormatOptions = {
      timeZone: "UTC",
      timeZoneName: "short",
    };
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString(
      "en-US",
      timeOptions,
    );
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString(
      "en-US",
      timeOptions,
    );
    const date = new Date(dt * 1000).toLocaleString("en-US", timeOptions);

    // This is the response that's returned when the command is invoked.
    // The layout uses Slack's Block Kit to present information. You
    // can learn more about it here: https://api.slack.com/block-kit.
    return json({
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: [
              `*${temp}°C*\n`,
              `Feels like ${feelsLike}°C. ${weather[0].main}.`,
              `Wind: \`${windSpeed} m/s ${windDirection}\``,
              `Humidity: \`${humidity}%\` Visibility: \`${visibility /
                1000}km\``,
              `Sunrise: \`${sunrise}\` Sunset: \`${sunset}\``,
            ].join("\n"),
          },
          accessory: {
            type: "image",
            image_url: `https://openweathermap.org/img/wn/${
              weather[0].icon
            }@2x.png`,
            alt_text: weather[0].description,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `${date}, ${city}, ${sys.country}`,
            },
          ],
        },
      ],
    });
  } catch (error) {
    // If something goes wrong in the above block, let's log the error
    // and return a generic error to the user.
    console.log(error);
    return json(
      {
        response_type: "ephemeral",
        text: "Error fetching the results. Please try after sometime.",
      },
      { status: 500 },
    );
  }
}

// Call handleRequest() on requests to "/" path.
serve({
  "/": handleRequest,
});

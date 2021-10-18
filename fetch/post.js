import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";

async function handleRequest(_request) {
  // For making a POST request we need to specify the method property
  // as POST and provide data to the body property in the same object.
  // https://post.deno.dev echoes data we POST to it.
  const response = await fetch("https://post.deno.dev", {
    method: "POST",
    headers: {
      // This headers implies to the server that the content of
      // body is JSON and is encoded using UTF-8.
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      message: "Hello from Deno Deploy.",
    }),
  });

  if (response.ok) {
    // The echo server returns the data back in
    const {
      json: { message },
    } = await response.json();
    return new Response(JSON.stringify({ message }), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return new Response(
    JSON.stringify({ message: "couldn't process your request" }),
    {
      status: 500,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    },
  );
}

console.log("Listening on http://localhost:8080");
await listenAndServe(":8080", handleRequest);

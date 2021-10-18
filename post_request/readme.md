# Handle a POST Request

This example demonstrates how to handle POST requests in Deno Deploy.

[![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/denoland/deploy_examples/main/post_request/mod.js)

- [Try Live Version](#try-live-version)
- [Run offline](#run-offline)

## Try Live Version

The example is deployed at https://post.deno.dev for demo.

A POST request with JSON body:

```sh
curl -X POST \
 -H 'content-type: application/json' \
 -d '{ "name": "Deno" }' https://post.deno.dev
```

Response:

```json
{
  "json": {
    "name": "Deno"
  }
}
```

A POST request with form data:

```sh
curl -X POST -F 'name=Deno' https://post.deno.dev
```

Response:

```json
{
  "form": {
    "name": "Deno"
  }
}
```

## Run Offline

You can run the example program on your machine using
[`deno`](https://github.com/denoland/deno):

```sh
deno run https://raw.githubusercontent.com/denoland/deploy_examples/main/post_request/mod.js
```

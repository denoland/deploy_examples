# Respond with JSON and/or HTML

This example demonstrates how to respond to requests with JSON and/or HTML in
Deno Deploy.

- [Try Live Version](#try-live-version)
- [Run offline](#run-offline)

## Try Live Version

The example is deployed at https://json-html.deno.dev for demo.

Visit or curl `https://json-html.deno.dev/json` endpoint to get response in
JSON.

```sh
curl --dump-header - https://json-html.deno.dev/json
# Response:

# HTTP/2 200
# content-type: application/json; charset=UTF-8
# content-length: 36
# date: Tue, 09 Mar 2021 15:11:57 GMT
# server: denosr
# x-dsr-id: asia-southeast1-a::runner-l4hc
# {"message":"Hello from Deno Deploy"}
```

Visit or curl `https://json-html.deno.dev/html` endpoint to get response in
HTML.

```sh
curl --dump-header - https://json-html.deno.dev/html
# Response:

# HTTP/2 200
# content-type: text/html; charset=UTF-8
# content-length: 73
# date: Tue, 09 Mar 2021 15:15:56 GMT
# server: denosr
# x-dsr-id: asia-southeast1-a::runner-l4hc
# <html>
#   <p><b>Message:</b> Hello from Deno Deploy.</p>
# </html>
```

## Run Offline

You can run the example program on your machine using
[`deployctl`](https://github.com/denoland/deployctl):

```sh
deployctl run https://raw.githubusercontent.com/denoland/deploy_examples/main/json_html/mod.js
# Listening at http://localhost:8000
```

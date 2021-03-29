# Most Discussed Issues

A small server rendered website that displays the most discussed issues of a
repository.

Visit [`https://issues.deno.dev`](https://issues.deno.dev) for a live version.

- [Deploy](#deploy)
- [Run Offline](#run-offline)

## Deploy

Follow the steps under [`Fauna`](#github) section to obtain a GitHub token and
click on the button below to deploy the application.

[![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/denoland/deploy_examples/main/issues/mod.js&env=GITHUB_TOKEN)

### GitHub

The application uses GitHub API to fetch issues sorted by most number of
comments. And we need the GitHub PAT (Personal Access Token) to communicate with
the API.

Here are the steps to obtain one:

1. Go to https://github.com/settings/tokens
2. Click on **Generate new token**
3. Fill the **Note** field for your own reference
4. Scroll down (don't select any scopes) and click on **Generate token**

That's it. You now have a token that you can use with the application.

## Run Offline

You can run the application on your local machine using
[`deployctl`](https://github.com/denoland/deployctl).

```
GITHUB_TOKEN=<token> deployctl run --libs=ns,fetchevent https://raw.githubusercontent.com/denoland/deploy_examples/main/issues/mod.js
```

Replace `<token>` with you GitHub token.

# Yet Another URL Shortener (YAUS)

A URL shortener built on top of Deno Deploy and FaunaDB.

Visit [`https://yaus.deno.dev`](https://yaus.deno.dev) for a live version.

- [Deploy](#deploy)
- [Run Offline](#run-offline)

## Deploy

Follow the steps under [`Fauna`](#fauna) section to obtain a FaunaDB secret and
click on the button below to deploy the application.

[![Deploy this example](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/denoland/deploy_examples/main/yaus/mod.tsx&env=FAUNA_SECRET)

### Fauna

We use FaunaDB to store our application data. Follow the below steps to create a
database and obtain a secret to access the DB from your Deno Deploy application.

Create a new database:

1. Go to https://dashboard.fauna.com (login if required) and click on **New
   Database**
2. Fill the **Database Name** field and click on **Save**.
3. Click on **GraphQL** section visible on the left sidebar.
4. Download [`schema.gql`](schema.gql) to your local machine and import the
   file.

Generate a secret to access the database:

1. Click on **Security** section and click on **New Key**.
2. Select **Server** role and click on **Save**. Copy the secret.

## Run Offline

You can run the application on your local machine using
[`deno`](https://github.com/denoland/deno).

```
FAUNA_SECRET=<token> deno run --allow-env --allow-net https://raw.githubusercontent.com/denoland/deploy_examples/main/yaus/mod.tsx
```

Replace `<token>` with your FaunaDB secret.

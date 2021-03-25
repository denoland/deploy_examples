# Yet Another URL Shortener (YAUS)

A URL shortener built on top of Deno Deploy and FaunaDB.

Visit [`https://yaus.deno.dev`](https://yaus.deno.dev) for a live version.

- [Deploy](#deploy)
- [Run Offline](#run-offline)

## Deploy

Instructions to deploy the application on your Deno Deploy account.

TODO(@satyarohith): add deploy instructions.

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
[`deployctl`](https://github.com/denoland/deployctl).

```
FAUNA_SECRET=<token> deployctl run --libs=ns,fetchevent https://raw.githubusercontent.com/denoland/deploy_examples/main/yaus/mod.tsx
```

Replace `<token>` with your FaunaDB secret.

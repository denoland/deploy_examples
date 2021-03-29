import {
  h,
  jsx,
  PathParams,
  serve,
} from "https://deno.land/x/sift@0.1.6/mod.ts";
import { nanoid } from "https://cdn.esm.sh/v14/nanoid@3.1.20/esnext/nanoid.js";

serve({
  "/": homePage,
  "/:code": handleCodeRequests,
});

// Styles for the home page.
const style = css`
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    font-family: "Roboto", sans-serif;
    background-color: #f8e3c6ad;
    margin: 0;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5em;
    width: 70vw;
  }

  .brand {
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.8);
  }

  main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 8em;
  }

  form {
    display: flex;
    justify-content: center;
    margin-block-end: 0;
  }

  form input {
    font-size: 1.5rem;
    border: 0.2em black solid;
    border-radius: 0.4em;
    padding: 0.5rem;
    width: 20em;
    background-color: transparent;
  }

  form input:focus {
    outline: none;
  }

  form button[type="submit"] {
    font-size: 1.5em;
    border: 0.2em black solid;
    border-radius: 0.4em;
    margin-left: 0.4em;
    background-color: transparent;
  }

  .link {
    display: flex;
    border: 0.2em solid black;
    padding: 0.2em 0.1em 0.2em 0.4em;
    font-size: 1.5em;
    margin-top: 1.5em;
    align-items: center;
    border-radius: 0.4em;
    background-color: transparent;
  }

  #clipboard {
    padding: 0;
    margin-left: 1em;
    background-color: transparent;
    border-style: none;
  }

  @media all and (max-width: 40em) {
    .brand {
      font-size: 1.4em;
    }

    header {
      width: 94vw;
    }

    form {
      flex-direction: column;
    }

    form input {
      width: 12.5em;
    }

    form button[type="submit"] {
      margin: 0.4em 0 0 0;
    }

    .link {
      font-size: 1.2em;
    }

    footer {
      font-size: small;
    }
  }
`;

// Script for the clipboard button.
const script = `
document.addEventListener("click", async (event) => {
  if (navigator?.clipboard && event.target.parentNode.id === "clipboard") {
    try {
      const text = event.target.parentNode.previousSibling.innerText;
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }
});
`;

/** The main function that responds to `/` route. */
async function homePage(request: Request) {
  let shortCode;

  // The input form makes a GET request with 'url' query
  // populated when someone submits the form. We use this
  // information to either create a new short link or get
  // an existing short link for the url.
  const { protocol, host, searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (url) {
    let code = await findCode(url);
    if (code) {
      shortCode = code;
    } else {
      code = searchParams.get("shortCode") ?? nanoid(6);
      shortCode = (await addUrl(url, code)).code;
    }
  }

  return jsx(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>YAUS | Yet Another URL Shortener</title>
      </head>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: script }}
      />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <body>
        <header>
          <a className="brand">
            <strong>Y</strong>et <strong>A</strong>nother <strong>U</strong>RL
            {" "}
            <strong>S</strong>hortener
          </a>
          <a href="https://github.com/denoland/deploy_examples/tree/main/yaus">
            <img
              height="32"
              width="32"
              src="data:image/svg+xml,%3Csvg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EGitHub icon%3C/title%3E%3Cpath d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E"
            />
          </a>
        </header>
        <main>
          <form>
            <input
              id="url"
              type="url"
              placeholder="Paste a URL to shorten"
              name="url"
              required
            />
            <button type="submit">
              Shorten
            </button>
          </form>
          {shortCode && <div className="link">
            <span>{`${protocol}//${host}/${shortCode}`}</span>
            <button id="clipboard">
              <img
                height="32"
                width="32"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3' /%3E%3C/svg%3E"
              />
            </button>
          </div>}
        </main>
        <footer>
          <p>Built using Fauna and Sift. Deployed on Deno Dash.</p>
        </footer>
      </body>
    </html>,
  );
}

/** Handle short link (`/<code>`) requests. */
async function handleCodeRequests(_request: Request, params?: PathParams) {
  const { code = "" } = params as { code: string };
  if (code) {
    const url = await findUrl(code);
    if (url) {
      return Response.redirect(url, 302);
    }
  }

  return jsx(<html>url not found</html>, { status: 404 });
}

/** Cache the code as key and url as value. */
const codeCache = new Map<string, string>();
/** Cache the url as key and code as value. */
const urlCache = new Map<string, string>();

// GraphQL to find url by code.
const findUrlGql = gql`
  query($code: String!) {
    findUrlByCode(code: $code) {
      url
    }
  }
`;
/** Find url for the provided url. */
async function findUrl(code: string): Promise<string | undefined> {
  if (codeCache.has(code)) {
    return codeCache.get(code);
  }

  const { data } = (await executeFauna(findUrlGql, { code })) as {
    data: { findUrlByCode: { url: string } };
  };
  if (data?.findUrlByCode?.url) {
    codeCache.set(code, data?.findUrlByCode.url);
    return data?.findUrlByCode.url;
  }
}

// GraphQL to find short code by url.
const findCodeGql = gql`
  query($url: String!) {
    findCodeByUrl(url: $url) {
      code
    }
  }
`;
/** Find short code for the provided url. */
async function findCode(url: string): Promise<string | undefined> {
  if (urlCache.has(url)) {
    return urlCache.get(url);
  }

  const { data } = (await executeFauna(findCodeGql, { url })) as {
    data: { findCodeByUrl: { code: string } };
  };
  if (data?.findCodeByUrl?.code) {
    urlCache.set(url, data.findCodeByUrl.code);
    return data.findCodeByUrl.code;
  }
}

// GraphQL to create a new link.
const addLinkGQL = gql`
  mutation($url: String!, $code: String!) {
    createLink(data: { url: $url, code: $code }) {
      code
      url
    }
  }
`;
/** Create a new link with the provided url and code.
 * Also populate the cache. */
async function addUrl(
  url: string,
  code: string,
): Promise<{ code: string; url: string }> {
  const {
    data: { createLink: link },
  } = (await executeFauna(addLinkGQL, { url, code })) as {
    data: { createLink: { url: string; code: string } };
  };

  codeCache.set(code, link?.url);
  urlCache.set(url, link?.code);
  return link;
}

/** Generic function to execute GraphQL at the Fauna GraphQL endpoint. */
async function executeFauna(
  query: string,
  variables: { [key: string]: unknown },
): Promise<{
  data?: unknown;
  error?: { message: string };
}> {
  const token = Deno.env.get("FAUNA_SECRET");
  if (!token) {
    throw new Error("environment variable FAUNA_SECRET not set");
  }

  try {
    const res = await fetch("https://graphql.fauna.com/graphql", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const { data, errors } = await res.json();
    if (errors) {
      return { data, error: errors[0] };
    }

    return { data };
  } catch (error) {
    return { error };
  }
}

/** Wrapper function to get syntax highlight for GraphQL in editors. */
function gql(gql: TemplateStringsArray) {
  return gql.join("");
}

/** Wrapper function to get syntax highlight for CSS in editors. */
function css(style: TemplateStringsArray) {
  return style.join("");
}

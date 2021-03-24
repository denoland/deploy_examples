import { h } from "https://deno.land/x/sift@0.1.6/mod.ts";
import Card from "../components/card.jsx";
import Layout from "../components/layout.jsx";
import Search from "../components/search.jsx";
import { getIssues } from "./api/issues.js";

export default async function homePage(request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repository");
  const { repository, issues, code, message } = await getIssues(repo);

  return (<Layout>
    <div className="container mx-auto max-w-screen-md p-4">
      <a className="text-3xl" href="/">Most Discussed Issues</a>
      <Search />
      {issues && <h6>
        The most discussed issues of{" "}
        <a
          className="text-blue-400"
          href={"https://github.com/" + repository}
        >
          {repository}
        </a>
        <div>
          {issues.map((issue) => <Card {...issue} />)}
        </div>
      </h6>}
      {code && <h5 className="text-red-400">{message}</h5>}
    </div>
  </Layout>);
}

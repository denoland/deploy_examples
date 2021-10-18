import { json, validateRequest } from "https://deno.land/x/sift@0.4.0/mod.ts";
import repositories from "../../data/repositories.js";

export default async function issuesEndpoint(request) {
  // We will only allow GET requests to this endpoint.
  const { error } = await validateRequest(request, {
    GET: {},
  });
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  // The user can provide a param named 'repository'
  // to fetch issues for that repository.
  const { searchParams } = new URL(request.url);
  const repository = searchParams.get("repository");

  // Get the issues from GitHub.
  const { issues, code, message } = await getIssues(repository);
  if (code === "repoNotFound") {
    return json(
      {
        message,
      },
      { status: 404 },
    );
  }

  // Return the message with 500 status code if GitHub token is not set.
  if (code === "tokenNotAvailable") {
    return json(
      {
        message,
      },
      { status: 500 },
    );
  }

  return json({ issues }, { status: 200 });
}

/** Get issues with most comments for the provided repository. Default
 *  to a random one from the top (most stars) 500 repositories. */
export async function getIssues(repository) {
  if (!repository) {
    repository = repositories[Math.floor(Math.random() * 500)];
  }

  // Retrieve GitHub API token from env. Error if not set.
  const token = Deno.env.get("GITHUB_TOKEN");
  if (!token) {
    return {
      code: "tokenNotAvailable",
      message: "Environment variable GITHUB_TOKEN not set.",
    };
  }

  // Fetch issues for the provided repository.
  const response = await fetch(
    `https://api.github.com/repos/${repository}/issues?sort=comments&per_page=10&state=all`,
    {
      method: "GET",
      headers: {
        "User-Agent": "Deno Deploy",
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
    },
  );

  // Handle if the response isn't successful.
  if (!response.ok) {
    // If the repository is not found, reflect that with a message.
    if (response.status === 404) {
      return {
        code: "repoNotFound",
        message: `Repository '${repository}' not found`,
      };
    } else {
      return {
        code: "serverError",
        message: `Failed to retrieve issues from GitHub. Try again.`,
      };
    }
  }

  // Return the issues.
  const issues = await response.json();
  return {
    repository,
    issues: issues.map((issue) => ({
      url: issue.html_url,
      title: issue.title,
      state: issue.state,
      comments: issue.comments,
      createdAt: issue.created_at,
      closedAt: issue.closed_at,
    })),
  };
}

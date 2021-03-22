import { h } from "https://deno.land/x/sift@0.1.6/mod.ts";
import { formatDistanceToNow } from "https://cdn.skypack.dev/pin/date-fns@v2.16.1-IRhVs8UIgU3f9yS5Yt4w/date-fns.js";

export default function Card({
  url,
  title,
  state,
  comments,
  createdAt,
  closedAt,
}) {
  return (
    <div className="p-2 border max-w-screen-md my-2 rounded">
      <a className="mb-1 hover:text-blue-400" href={url}>
        <h4>{title}</h4>
      </a>
      <div className="flex items-center">
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          className={`mr-2 fill-current ${
            state === "closed" ? "text-red-600" : "text-green-600"
          }`}
        >
          {state === "closed"
            ? (
              <path
                fillRule="evenodd"
                d="M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z"
              />
            )
            : (
              <path
                fillRule="evenodd"
                d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
              />
            )}
        </svg>
        <div className="flex items-center">
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path
              fillRule="evenodd"
              d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
            />
          </svg>
          <span className="ml-1 text-sm">{comments}</span>
        </div>
        <span className="text-sm mx-2">
          {state === "closed"
            ? `closed ${formatDistanceToNow(new Date(closedAt))} ago`
            : `opened ${formatDistanceToNow(new Date(createdAt))} ago`}
        </span>
      </div>
    </div>
  );
}

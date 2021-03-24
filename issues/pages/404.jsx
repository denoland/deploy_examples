import { h } from "https://deno.land/x/sift@0.1.6/mod.ts";
import Layout from "../components/layout.jsx";

export default function notFoundPage(request) {
  return (
    <Layout>
      <div className="container mx-auto max-w-screen-md p-4">
        <h1 className="text-3xl">Page not found</h1>
      </div>
    </Layout>
  );
}

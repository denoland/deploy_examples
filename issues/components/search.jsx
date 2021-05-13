import { h } from "https://deno.land/x/sift@0.1.7/mod.ts";

/** Validate if the form value follows the appropriate
 *  structure (<owner>/<repo>). */
function validateForm() {
  // deno-lint-ignore no-undef
  const repository = document.forms["search"]["repository"].value;
  if (repository.split("/").length !== 2) {
    alert(
      `Input should be in the form of 'owner/repository'. No forward slashes at the beginning or end.`,
    );
    return false;
  }
  return true;
}

export default function Search() {
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: validateForm }} />
      <form
        className="flex items-center mt-8"
        name="search"
        action="/"
        method="get"
        onSubmit="return validateForm()"
      >
        <input
          className="rounded border px-4 h-8 mr-2"
          type="search"
          name="repository"
          placeholder="<owner>/<repo>"
          required
        />
        <button
          className="bg-blue-600 text-white px-2 rounded h-8"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

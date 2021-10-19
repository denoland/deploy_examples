# Check TypeScript types.
check:
	deno cache fetch/get.js
	deno cache fetch/post.js
	deno cache post_request/mod.js
	deno cache json_html/mod.js
	deno cache issues/mod.js
	deno cache discord/mod.ts
	deno cache slack/mod.ts
	deno cache yaus/mod.tsx
	deno cache telegram/mod.ts

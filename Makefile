DEPLOYCTL=deno run --allow-read --allow-write --allow-net --allow-env --allow-run --no-check 'https://deno.land/x/deploy/deployctl.ts'
# Check TypeScript types.
check:
	$(DEPLOYCTL) check fetch/get.js
	$(DEPLOYCTL) check fetch/post.js
	$(DEPLOYCTL) check post_request/mod.js
	$(DEPLOYCTL) check json_html/mod.js
	$(DEPLOYCTL) check --libs=ns,fetchevent issues/mod.js
	$(DEPLOYCTL) check --libs=ns,fetchevent discord/mod.ts
	$(DEPLOYCTL) check --libs=ns,fetchevent slack/mod.ts
	$(DEPLOYCTL) check --libs=ns,fetchevent yaus/mod.tsx

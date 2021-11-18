# Intro or maybe Thoughts

Moving shared closures from a local static file to a node (koa) server to solve the issues of not being able to [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) the sharedClosure js file.

I want to be able to fetch this file in order to show it in the browser (using [prism](https://prismjs.com)), but fetch requires http instead of file system lookup.

# Run

- dev: `npm run dev`

# Plans

- [ ] One repo, with clear branches.
- [x] Koa with Prism. branch: koa-prism
- [ ] CSS:
  - [ ] grid
  - [ ] rounded corners
- [ ] Typescript
- [ ] Svelte
- [ ] prettier repo copy
- [ ] SVG

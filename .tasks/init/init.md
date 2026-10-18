We are going to do an assignment. Read assignment.txt in this folder.

Then let's talk about the setup.

My first thoughts are:

We do this with Vite plus vanilla React in TypeScript, strict mode on. We shall skip shadcn this time to avoid the normal AI look. We will use headless UI components to speed things up, React Aria or Radix UI, and Tailwind.
We shall use Dribbble, Refero, and Mobbin to do some research on the UI. We shall also do 4 different HTML mockups before we start building.
We shall create 3 agents: 1 review agent, standard code review using Claude review commands; 1 agent that is a gate on commit, it should be invoked on commits and shall validate our code standards, for example our tests shall never have weak selectors, the readme is up to date, and so on; and 1 test agent that knows how to run and build our tests according to our standards.

We shall create a monorepo with pnpm workspaces. Keep it simple, one repo with sub-projects, no Turborepo:
- app (Vite, React, vitest for unit tests)
- test (Playwright for e2e)

We shall build mobile first, but it must also look good in a desktop browser.
We shall build the app a11y compatible.
We shall use animated icons to lift the UI a bit. We are time limited, so there is not much time to do anything advanced. Where suited, for example https://animate-ui.com/docs/icons, but not in all places.
We shall use the View Transition API where suited, and most if not all views should have URL params for direct linking.
We shall build this with an app feeling, so loading states and component rendering must feel native, no generic spinners or shifting UI while loading.
We shall use a splash screen (if this takes time, it should have some kind of animation) while loading init data. If needed, the data cache, we might not need it, or fast static can be used.
We shall use TanStack Query with fixed keys as the data layer. It fetches data once and the cached data is reused in all components. We add Zustand only if we need to expand or transform the data. Then TanStack feeds Zustand. Otherwise we use React Context.
We shall use Zod for the data types. We should parse the incoming JSON doc but not validate the whole doc. If one item is broken, we don't want to invalidate the whole doc. Load the doc, type check one item at a time; a broken item/object we skip, console.log the error, and add a comment about sending to Sentry or a similar solution.
We shall build this as a PWA with offline support. The data loaded in the JSON should be stored and reused. Important: add a /reinstall.html, a page that is not in the service worker precache. It unregisters the service worker, clears all caches, and reloads. Used when a PWA install gets stuck.
We will host on Firebase. Create a CI/CD flow with GitHub Actions. Merge to the production branch deploys to Firebase. PRs get a Firebase preview channel if time allows.
We shall use Playwright for e2e and vitest for unit tests.

I have set up a git repo and a Firebase project.

This is my first thought. Read the assignment, and this. Then let's talk about this.
Create an init-agent-feedback.md in an easy to read format.
Start with a short summary of the test and what you think it should include, then each of my "we shall" should be the context, then your comment.
Also at the end, add any questions/thoughts you have.
Then I will go through this one more time and we create an action plan from there.

Remember we are not jr devs vibe coding a random app. We work in a structured and reusable pattern with 100% control.
You are the orchestrator agent. Use subagents when needed. Your context is valuable and needs to be kept low.
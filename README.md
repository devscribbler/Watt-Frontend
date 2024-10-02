# Watt Frontend Monorepo

## Prerequisites

- NodeJS 16.x
- Yarn

## Setup

Run `yarn` in the root of the project

## Running apps

Run `yarn quote` to run the quote tool

Run `yarn portal` to run the portal

## About the monorepo

We use [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) for the monorepo.

Apps, which are runnable frontends or tools, live in `apps/`. Packages, which are internal libraries made up of code only (no build instructions or artifacts) live in `packages/`.

Each workspace needs to have a `package.json` file with `name` and `version` added. `name` should be unique and respect the format `@watt/[package-name]`. To import from a package, use the name declared here.

```ts
import { Something } from `@watt/something`
```

## Storybook

You can run the frontend storybook with `yarn storybook`

## Upgrading dependencies

You can use the [`upgrade-interactive`](https://yarnpkg.com/cli/upgrade-interactive) command to upgrade Yarn dependencies

----

[ old evozon docs below ]

## Transpiling code

If you want a certain package to be transpiled, please use a custom webpack loader to load the code with babel.

### CI

You'll find some example workflows for github action in [.github/workflows](./.github/workflows).
By default, they will ensure that

- You don't have package duplicates.
- You don't have typecheck errors.
- You don't have linter / code-style errors.
- Your test suite is successful.
- Your apps (nextjs) or packages can be successfully built.

Each of those steps can be opted-out.

To ensure decent performance, those features are present in the example actions:

- **Caching** of packages (node_modules...) - install around 25s
- **Caching** of nextjs previous build - built around 20s
- **Triggered when changed** using [actions paths](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths), ie:

```
 paths:
   - "apps/blog-app/**"
   - "packages/**"
   - "package.json"
   - "tsconfig.base.json"
   - "yarn.lock"
   - ".yarnrc.yml"
   - ".github/workflows/**"
   - ".eslintrc.base.json"
   - ".eslintignore"
```

test

Test fake build

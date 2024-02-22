# Contributing

Thanks for your interest in contributing to PointIt. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@jackbcodes](https://github.com/jackbcodes).

## Reporting issues

If you have found what you think is a bug, please create an [issue](https://github.com/jackbcodes/pointit/issues/new).

## Suggesting new features

If you have a suggestion for a new feature, please start a [discussion](https://github.com/jackbcodes/pointit/discussions/new/choose) if one does not already exist.

## About this repository

This repository is a single application containing both the server and client.

- [React](https://react.dev/) and [Vite](https://vitejs.dev/) for the client
- [Express](https://expressjs.com/) and [tRPC](https://trpc.io/) for the server
- [Fly.io](https://fly.io/) for hosting

## Development

### System requirements

- Node.js >= 20.0.0
- npm >= 8.18.0
- git >= 2.38.0

### Run Redis on Docker

To run the app locally you need to run Redis on your machine. This guide will demonstrate how to do so using Docker, but there are a [number of ways](https://redis.io/docs/install/) to do it.

1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Start Redis Stack container:

   ```sh
   docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
   ```

If you need to, you can connect to the server using `redis-cli`:

```sh
docker exec -it redis-stack redis-cli
```

### Fork this repo

https://github.com/jackbcodes/pointit/fork

### Clone on your local machine

```sh
git clone https://github.com/your-username/pointit.git
```

### Create a new branch

```sh
git checkout -b my-new-branch
```

### Install dependencies

```sh
npm install
```

### Create .env file

```sh
cp .env.example .env
```

You can remove the comments at the top of the new file.

### Start dev server

```sh
npm run dev
```

http://localhost:3000/

## Committing

Before you create a pull request, please ensure your commits comply with our commit convention. This repository uses [conventional commits](https://www.conventionalcommits.org/).

The commit must be one of the following types:

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

If you are unfamiliar with the usage of conventional commits, the short version is to simply specify the type as the first word, and follow it with a colon and a space, then start your message from a lowercase letter, like this:

```sh
feat: add a new voting values option
```

You can also specify the scope of the commit in the parentheses after a type:

```sh
fix(client): order players by when they joined
```

## Testing

E2E tests are written using [Playwright](https://playwright.dev/). To run the tests:

```sh
npx playwright install
```

```sh
npm run test:e2e
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.

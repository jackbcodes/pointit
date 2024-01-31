# PointIt

## 👷‍♂️ Development

To run the app locally you need to first run Redis on your machine. This guide will demonstrate how to do so using Docker, but there are a [number of ways](https://redis.io/docs/install/) to do it.

### Run Redis on Docker

1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Start Redis Stack container:

   ```sh
   docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
   ```

Connect to the server using `redis-cli`:

```sh
docker exec -it redis-stack redis-cli
```

### Start dev server

```sh
npm run dev
```

## 🚀 Deployment

[Fly.io](https://fly.io/) with Docker is the recommended way to deploy your app. It has a native integration with [Upstash](https://fly.io/docs/reference/redis/), offering a free Redis database with reasonable usage limits.

This repo comes with a [GitHub Actions workflow](./.github/workflows/deploy.yml) that automatically deploys your app. To get this working, you need to set up Fly:

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2. Sign up and log in

   ```sh
   flyctl auth signup
   ```

3. Create an app

   ```sh
   flyctl apps create pointit
   ```

4. Create a Redis database

   ```sh
   flyctl redis create
   ```

   > **Note:** This will output the private connection URL needed to connect to your database from your app

5. Initialize Git

   ```sh
   git init
   ```

   - Create a new [GitHub Repository](https://repo.new), and then add it as the
     remote for your project. **Do not push your app yet!**

     ```sh
     git remote add origin <ORIGIN_URL>
     ```

6. Add secrets:

   - Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user
     settings on Fly and create a new
     [token](https://web.fly.io/user/personal_access_tokens/new), then add it to
     [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
     with the name `FLY_API_TOKEN`.

   - Add `AUTH_SECRET` to your fly app secrets

     ```sh
     flyctl secrets set AUTH_SECRET=$(openssl rand -hex 32) --app pointit
     ```

     > ≈ If you don't have openssl installed, you can also use [1Password](https://1password.com/password-generator) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret

   - Add `REDIS_URL` to your fly app secrets. This is the URL outputted when creating the database. If you have lost it, you can retrieve it using `fly redis status <database-name>`

     ```sh
     flyctl secrets set REDIS_URL=<url>/?family=6 --app pointit
     ```

     > ❗️ **Note:** You must append "/?family=6" to the URL to force IPv6 resolution. Otherwise, you will not be able to connect

7. Commit!

   Now that everything is set up you can commit and push your changes to your repo. Every commit to your main branch will trigger a deployment to your production environment.

### Deploying locally

If you'd prefer to deploy locally and not use GitHub Actions, you need to follow the first 6 steps above and run the deploy command:

```sh
flyctl deploy
```

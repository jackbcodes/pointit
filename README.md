# PointIt

## 👷‍♂️ Development

To run the app locally we need to first run Redis on your machine. This guide will demonstrate how to do so using Docker, but there are a [number of ways](https://redis.io/docs/install/) to do it.

### Run Redis on Docker

1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Start Redis Stack container:

   ```sh
   docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
   ```

### Start app

```sh
yarn dev
```

## 🚀 Deployment

> More details coming soon...

### Using Render

1. Create Redis instance - https://dashboard.render.com/new/redis
2. Create web service
   - Add REDIS_URL and AUTH_SECRET env var
   - Set node version to LTS

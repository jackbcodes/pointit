# base node image
FROM node:20-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /myapp

WORKDIR /myapp

# Setup production node_modules
FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Install all node_modules, including dev dependencies
FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

COPY --from=prod-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/dist /myapp/dist

CMD ["npm", "run", "start"]

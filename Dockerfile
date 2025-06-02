FROM node:23.11-alpine AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml svelte.config.js ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

COPY . ./
RUN pnpm run build


FROM node:23.11-alpine
WORKDIR /app

ENV TZ="Europe/Berlin"

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --prod

COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]
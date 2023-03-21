FROM node:18.14.2 as build-stage

COPY . .

RUN npm install

RUN npm run format:check
# RUN npm run check  # Svelte check causes an out of memory error when using in a Docker image build
RUN npm run lint
RUN npm run test

RUN npm run build

FROM nginx as production-stage

COPY --from=build-stage dist /usr/share/nginx/html

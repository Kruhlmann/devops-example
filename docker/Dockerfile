FROM alpine:latest

WORKDIR /usr/app
RUN apk add --no-cache nodejs yarn git
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install 
COPY tsconfig.json tsconfig.json
COPY static static
COPY views views
COPY src src
RUN yarn tsc
EXPOSE 3000
ENTRYPOINT ["node", "dist/main.js"]

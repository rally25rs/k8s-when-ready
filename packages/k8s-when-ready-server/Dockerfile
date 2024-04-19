FROM node:20-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN corepack enable
RUN yarn workspaces focus --production

COPY . /usr/src/app

EXPOSE 3000
ENTRYPOINT ["yarn", "node", "index.js"]

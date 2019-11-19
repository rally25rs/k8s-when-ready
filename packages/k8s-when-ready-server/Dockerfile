FROM node:13-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN yarn install --production --non-interactive

COPY . /usr/src/app

EXPOSE 3000
ENTRYPOINT ["node index.js"]

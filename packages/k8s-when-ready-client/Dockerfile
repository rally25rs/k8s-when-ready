FROM node:13-alpine

RUN apk update
RUN apk add curl

RUN curl -o- -L https://yarnpkg.com/install.sh | sh

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY yarn.lock /usr/src/app
COPY package.json /usr/src/app
RUN yarn install --production --frozen-lockfile --non-interactive

COPY . /usr/src/app

EXPOSE 3000
CMD ["node", "index.js"]

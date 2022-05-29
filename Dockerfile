FROM node:16-alpine

RUN apk add --no-cache bash curl

COPY package.json /tmp/package.json

WORKDIR /tmp
RUN npm install

WORKDIR /opt/git


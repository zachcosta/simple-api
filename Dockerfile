FROM node:16-alpine

RUN apk add --no-cache bash curl

COPY package.json /tmp/package.json

WORKDIR /tmp
RUN npm install

ENV USER=nonroot
ENV UID=12345
ENV GID=23456

RUN adduser \
    --disabled-password \
    --gecos "" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"

USER ${USER}
WORKDIR /opt/git


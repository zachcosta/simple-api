FROM node:latest

RUN apt-get update && apt-get install -y bash net-tools sudo telnet

EXPOSE 3000/tcp

CMD bash
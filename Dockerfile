FROM node:latest

RUN apt-get update && apt-get install -y bash net-tools sudo telnet

CMD bash
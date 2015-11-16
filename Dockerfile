FROM node:4.2.2
MAINTAINER Benedict Hobart, hobart.benedict@gmail.com

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app/
RUN npm install
RUN npm run scrape
CMD npm start

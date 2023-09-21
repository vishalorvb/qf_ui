FROM node:18-alpine

WORKDIR /QF01-docker/

COPY public/ /QF01-docker/public
COPY src/ /QF01-docker/src
COPY package.json /QF01-docker/


RUN npm install

CMD ["npm", "start"]

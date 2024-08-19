FROM node:22.6.0-alpine3.20

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

CMD ["npm", "start"]
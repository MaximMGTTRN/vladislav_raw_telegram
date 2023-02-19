FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

RUN npm run migrate:up

COPY . .

RUN npm run build

CMD [ "node", "dist/src/main.js" ]
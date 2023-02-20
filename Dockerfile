FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN npm run build

# RUN npm run migrate:up

CMD [ "node", "dist/src/main.js" ]
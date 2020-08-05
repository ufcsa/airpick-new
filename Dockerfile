FROM node:12

WORKDIR /usr/src/airpick

ENV NODE_ENV=production
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000
CMD ["node", "server"]

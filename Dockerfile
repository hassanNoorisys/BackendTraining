FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate

COPY .env .env

EXPOSE 3000

CMD ["npm", "start"]

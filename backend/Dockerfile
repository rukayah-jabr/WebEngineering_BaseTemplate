# Stage 1: Development
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm", "run", "dev"]


# Stage 2: Build - als Platzhalter
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .


# Stage 3: Production
FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=build /app /app

EXPOSE 4000
CMD ["node", "server.js"]

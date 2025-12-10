FROM node:20

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server ./server
COPY db ./db

EXPOSE 3000
WORKDIR /app/server
CMD ["npm", "start"]


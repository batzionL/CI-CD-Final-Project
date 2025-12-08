FROM node:20

WORKDIR /app

# העתקת קבצי package.json ו-package-lock.json בלבד
COPY package*.json ./

RUN npm install --production

# העתקת שאר הקבצים
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

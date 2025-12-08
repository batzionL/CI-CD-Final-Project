# משתמשים בתמונה מלאה של Node.js (Debian-based)
FROM node:20

# יוצרים תיקייה באימג׳ ושם מעתיקים את הקבצים
WORKDIR /app

# מעתיקים את package.json ו- package-lock.json קודם
COPY package*.json ./

# מתקינים את התלויות
RUN npm install --production

# מעתיקים את כל שאר הקבצים
COPY . .

# מגדירים את הפורט שהאפליקציה מאזינה עליו
EXPOSE 3000

# הפקודה שתורץ כשהקונטיינר עולה
CMD ["npm", "start"]

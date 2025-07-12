FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Gerekli paketleri kuruyoruz
RUN apk --no-cache add --virtual builds-deps build-base python3 make g++

# bcrypt'i bcryptjs ile değiştiriyoruz
RUN npm install --only=production && \
    npm uninstall bcrypt && \
    npm install bcryptjs

COPY . .

EXPOSE 8000

# Uygulama başlatılmadan önce controllers/auth.js'yi güncelliyoruz
CMD sed -i 's/const bcrypt = require("bcrypt")/const bcrypt = require("bcryptjs")/g' controllers/auth.js && \
    node app.js

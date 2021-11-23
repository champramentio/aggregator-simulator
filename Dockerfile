FROM node:16-alpine3.12
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
RUN npm install nodemon -g
COPY . .
ENTRYPOINT ["nodemon"]
CMD ["server.js"]
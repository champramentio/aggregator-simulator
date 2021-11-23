FROM node:16-alpine3.12
WORKDIR /app
COPY . .
RUN npm install --only=production
RUN npm install nodemon -g
ENTRYPOINT ["nodemon"]
CMD ["server.js"]
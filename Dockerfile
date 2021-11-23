FROM node:16-alpine3.12
ENV NODE_ENV production
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
RUN npm install nodemon -g
USER node
COPY --chown=node:node . .
ENTRYPOINT ["nodemon"]
CMD ["server.js"]
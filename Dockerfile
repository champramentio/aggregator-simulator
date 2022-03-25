FROM node:16.14.2-alpine
ENV NODE_ENV production
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm install nodemon -g
USER node
COPY --chown=node:node . .
ENTRYPOINT ["nodemon"]
CMD ["server.js"]
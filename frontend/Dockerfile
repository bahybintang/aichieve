FROM node
WORKDIR /app
COPY ./app /app
RUN cd /app && npm install && npm run build
CMD node /app/server.js

FROM node
WORKDIR /app
COPY ./app /app
RUN cd /app && npm install && npm run build
EXPOSE 80
CMD node /app/server.js

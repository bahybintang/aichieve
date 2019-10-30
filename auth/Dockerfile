FROM node
WORKDIR /app
COPY ./app /app
RUN cd /app && npm install
EXPOSE 13337
CMD node /app/server.js


FROM node
WORKDIR /app
COPY ./app /app
RUN cd /app && npm install && npm install bcrypt
CMD node /app/server.js


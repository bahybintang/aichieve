FROM node
WORKDIR /app
COPY ./app /app
RUN cd /app && npm install && npm install bcrypt
CMD cd app && npm run prod


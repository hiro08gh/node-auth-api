FROM node:8.12-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080
CMD ["npm", "start]

FROM node:12

WORKDIR /NODE_PROJECT

COPY package*.json ./

RUN npm install

COPY . . 

ENV PORT=3000

EXPOSE 3000

CMD [ "npm" , "app4.js" ]
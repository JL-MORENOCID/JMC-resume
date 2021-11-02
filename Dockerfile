FROM node:11.1.0-alpine as build


FROM node:11.1.0-alpine
WORKDIR /app  

COPY package.json . 
COPY package-lock.json . 
RUN npm install  

EXPOSE 3000  

COPY . .  

CMD ["npm","run","start"]


docker run adasdassda prueba hola
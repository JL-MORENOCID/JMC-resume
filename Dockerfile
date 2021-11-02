FROM node:11.1.0-alpine as builder
WORKDIR /app  

COPY package.json . 
COPY package-lock.json . 
RUN npm install

COPY . .  

RUN npm run build


FROM nginx:1.20.1-alpine

COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
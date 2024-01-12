FROM node:21
WORKDIR /eshop-app/backend/orders
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5500
CMD [ "node", "index.js" ]

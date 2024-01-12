FROM node:21
WORKDIR /eshop-app/backend/products
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]

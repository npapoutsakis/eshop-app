FROM node:21
WORKDIR /eshop-app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]

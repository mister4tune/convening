FROM node:15.4.0-alpine3.10
ADD . /app 
WORKDIR /app
COPY package*.json ./
RUN npm install --registry=/registry.npm.taobao.org && npm build
EXPOSE 7001
CMD ["npm", "start"]
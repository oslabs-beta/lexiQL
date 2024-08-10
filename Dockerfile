FROM node:20.8.1
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["node", "./server/server.js"]

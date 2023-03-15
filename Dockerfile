FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN yarn install --production
COPY . ./
CMD ["node" ,"./dist/index.js"]
EXPOSE 8080

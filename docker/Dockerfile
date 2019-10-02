FROM node:8.16.1-jessie
WORKDIR /usr/app
COPY . ./
RUN npm install --production
CMD ["node", "./index.js"]

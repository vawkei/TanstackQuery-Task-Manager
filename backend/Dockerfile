FROM node:20
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 5000
# CMD [ "node", "index.ts" ]
CMD ["npx", "ts-node", "src/index.ts"]

FROM node:20
WORKDIR /app
# COPY  package.json /app  
COPY package.json package-lock.json* ./
RUN npm install
COPY . /app
EXPOSE 3000
# CMD [ "npm", "run", "dev" ]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
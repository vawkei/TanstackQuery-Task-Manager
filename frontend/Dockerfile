# 👇 Development Build

# FROM node:20
# WORKDIR /app
# # COPY  package.json /app  
# COPY package.json package-lock.json* ./
# RUN npm install
# COPY . /app
# EXPOSE 3000
# # CMD [ "npm", "run", "dev" ]
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# i am repeating the process again. I have logged in as ben in one tab and george in another. both localhost:3000. i noticed in the console, under application in the browser, i noticed a cookie was given to george and then to ben there. what i noticed is that is like both of them were given the same cookie: george: 

# 👇========================== Production Build===============================👇
# Stage 1: Build React app
FROM node:20 AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx.conf if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf
# nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM  nginx:stable-alpine
# COPY  nginx.conf /etc/nginx/nginx.conf


# # Stage 1: Build React app
# FROM node:20 AS build
# WORKDIR /app
# COPY ../frontend/package.json ../frontend/package-lock.json* ./
# RUN npm install
# COPY ../frontend/. .
# RUN npm run build

# # Stage 2: Serve React + proxy backend with Nginx
# FROM nginx:stable-alpine

# # Copy built React files from Stage 1
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]




# Stage 1: Build React app
FROM node:20 AS build
WORKDIR /app

COPY ./../frontend/package.json ./ 
COPY ./../frontend/package-lock.json ./ 
RUN npm install

COPY ./../frontend ./ 
RUN npm run build

# Stage 2: Serve React + proxy backend with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
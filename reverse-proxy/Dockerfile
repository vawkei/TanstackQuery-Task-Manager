FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html



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




# # Stage 1: Build React app
# FROM node:20 AS build
# WORKDIR /app

# COPY frontend/package.json frontend/package-lock.json* ./
# RUN npm install

# COPY frontend/ ./
# RUN npm run build

# # Stage 2: Serve React + proxy backend with Nginx
# FROM nginx:stable-alpine

# # Copy Vite build output (dist) to Nginx html folder
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY reverse-proxy/nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]



# Why I added ./ in front of the path

# ./../frontend is simply safer and more explicit in Docker, because:

# Some CI runners treat ../folder as invalid

# Prepending ./ makes the path clearly relative to the build context

# So:

# COPY ../frontend .


# and

# COPY ./../frontend .
# i still dont understand this part:
# COPY ../frontend/package.json ../frontend/package-lock.json* ./
# RUN npm install
# COPY ../frontend/. .
# RUN npm run build

# against this part:
# COPY frontend/package.json frontend/package-lock.json* ./
# RUN npm install

# COPY frontend/ ./
# RUN npm run build
# then . is the root of the repo.

# COPY ./../frontend ./ will fail, because ../frontend does not exist relative to the root.

# That’s why the build stage never creates /app/build.

# ✅ Fix: Use a path relative to the build context, which is the root of the repo in your case. So your Dockerfile should have:

# # Stage 1: Build React app
# FROM node:20 AS build
# WORKDIR /app

# COPY frontend/package.json frontend/package-lock.json* ./
# RUN npm install

# COPY frontend/ ./
# RUN npm run build

# # Stage 2: Serve React + proxy backend with Nginx
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY reverse-proxy/nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Notice frontend/ instead of ./../frontend/.
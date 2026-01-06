# FROM node:20
# WORKDIR /app
# # COPY  package.json /app  
# COPY package.json package-lock.json* ./
# RUN npm install
# COPY . /app
# # EXPOSE 3000
# # CMD [ "npm", "run", "dev" ]
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]






# 📒📒📒📒📒 Note:📒📒📒📒📒
# Builds React app → /app/dist

# No CMD

# Used only in CI/CD to create an image
# frontend/Dockerfile
# 📒📒📒📒📒 Note:📒📒📒📒📒
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Export static files
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/dist /app

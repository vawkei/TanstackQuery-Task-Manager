# TanStack Query Task Manager

A full-stack MERN task manager application demonstrating CRUD operations, authentication, horizontal scaling, Redis sessions, and containerized deployment with Docker & Nginx.
This project is structured into multiple branches, each showcasing a new backend or DevOps concept. It is designed as a progressive learning + production-ready architecture project.

# Features

- Full CRUD (Create, Read, Update, Delete) operations

- Authentication (JWT cookies or Redis sessions depending on branch)

- TanStack Query for API communication

- MERN architecture (MongoDB, Express.js, React, Node.js)

- Horizontal scaling with Node.js Cluster

- Load balancing with Nginx

- Dockerized frontend, backend, and reverse-proxy

- Redis-powered session management

- In-progress CI/CD pipeline for deployment to Render

# Project Structure

Each branch introduces a new architectural improvement.

# Branches Overview
1. **master branch — Basic CRUD + JWT Cookies**
**Key features:**

- CRUD functionality implemented using TanStack Query

- Backend authentication using JWT cookies

- Clean MERN architecture

- Standard development environment (no containers yet)

This branch represents the foundation of the project.

2. **feature/redis-sessions — Redis-Based Authentication Sessions**
In this branch:

- JWT cookies are removed

- Redis is installed and integrated

- Express-session + Redis store handles authentication

- Backend now maintains server-side sessions instead of tokenbased auth

**Why Redis sessions?**

- Secure, server-controlled login sessions

- Prevents JWT tampering

3. **horizontal-scaling — Node.js Cluster Implementation**
This branch focuses strictly on backend scaling.

A new file cluster.ts is added to demonstrate:
Using the Node.js Cluster module

- Spawning multiple worker processes equal to CPU cores

- Improving performance on multi-core machines

- Utilizing all available server resources instead of one single thread
**Why this matters**:
Node.js is single-threaded by default.
Clustering enables true parallel processing on the same server.

4. **load-balancing — Docker + Nginx Reverse Proxy**
This is the most DevOps heavy branch.

**Technologies used:**
- Docker

- Docker Compose

- Nginx reverse proxy

**Containerization of**:

- Frontend (React)

- Backend (Node.js)

- Reverse-proxy (Nginx)

- MongoDb

- Redis

Each major folder contains its own Dockerfile.
Docker Compose orchestrates all services:
- frontend
- backend
- nginx reverse-proxy
- mongodb
- redis

**What Nginx does in this branch**:

- Load balances traffic across backend containers

- Acts as a gateway routing all requests

- Ensures scalability and reliability

This setup simulates real-world production infrastructure.

# Next Steps (Work in Progress):
- CI/CD Pipeline
- Cloud Deployment

# Running the Project Locally:
Prerequisite: Docker installed.

- clone the repo.
- To start the master branch which is default:
**For frontend:**
```bash
 cd frontend
 ```
 ```bash
 npm run dev
 ```
 **For backend:**
 ```bash
 cd backend
 ```
 ```bash
 npm run dev
 ```
- Checkout the branch you want to run: 
```bsh
git checkout load-balancing
```
- Start all services: 
```bash
docker-compose up
```
- The app will be available on the port specified in docker-compose.yml.

# Purpose of This Project:

The goal is to build not just a CRUD app, but a production-ready system, showcasing:

- API state management

- Authentication strategies

- Scaling a Node server

- Load balancing traffic

- Container orchestration

- Preparing for automated deployment

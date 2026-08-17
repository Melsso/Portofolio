# My Portfolio

Welcome to my portfolio! This repository contains the source code for my personal portfolio website, along with a showcase of the projects I've worked on.

## About Me

I'm a software developer with a Bachelor's degree in Computer Science and 1 year of professional experience. I work across the full stack, from front-end to back-end, and I'm always looking for new challenges to apply my skills to impactful projects.

## Projects

- **[Hang](https://github.com/Melsso/hang)**
	- A production-style real-time messaging system built with FastAPI, WebSockets, Redis Pub/Sub, PostgreSQL, and Dockerized multi-instance deployment behind NGINX load balancing.
	- **Tech:** Python, FastAPI, WebSockets, Redis Pub/Sub, PostgreSQL, NGINX, Docker, React, CI

- **[Durden](https://github.com/Melsso/Durden)**
	- An image detection API built with FastAPI and YOLO, supporting multiple models, structured predictions, and asynchronous model loading. Containerized and deployed on Google Cloud Run with automated GitHub Actions CI/CD for testing, image publishing, and deployment.
	- **Tech:** Python, FastAPI, YOLO, Docker, Google Cloud Run, GitHub Actions, CI/CD

- **[Sentinel](https://github.com/Melsso/sentinel)**
	- An authentication service built with FastAPI, Postgres, and Redis. Handles registration, email verification, login with rotating refresh tokens, password reset, and account deletion, with rate limiting, structured audit logging, and CORS/security headers baked in. Fully Dockerized with a GitHub Actions CI pipeline running ruff, mypy, pytest, and pip-audit.
	- **Tech:** Python, FastAPI, PostgreSQL, Redis, Docker, GitHub Actions, ruff, mypy, pytest, CI

- **[Queue Task Manager](https://github.com/Melsso/queue-task-manager)**
	- An asynchronous task queue system built with FastAPI, SQLAlchemy, and distributed workers. It enables workers to register capabilities, receive tasks from a broker, execute jobs asynchronously, and report results with support for task prioritization, retries, heartbeats, and full end-to-end task lifecycle management.
	- **Tech:** Python, FastAPI, SQLAlchemy, Distributed Workers, Async, CI

- **[Rate Limiter](https://github.com/Melsso/rate-limiter)**
	- An asynchronous Python rate limiting library built with FastAPI and Redis, supporting Fixed Window, Sliding Window, and Token Bucket algorithms. It uses Lua scripts for atomic Redis operations where appropriate, includes FastAPI middleware and route decorators for seamless integration, exposes standard rate-limit response headers, and is fully tested with pytest, ruff, mypy, GitHub Actions CI, and performance benchmarks using pytest-benchmark.
	- **Tech:** Python, FastAPI, Redis, Lua, pytest-benchmark, CI

- **[Search Engine](https://github.com/Melsso/search-engine)**
	- A vector database built from scratch in Python: brute-force and HNSW approximate search, named collections with metadata filtering, disk persistence, a FastAPI HTTP layer, Docker deployment, and CI — with real benchmarking work showing where HNSW actually beats brute force and what it costs to get there.
	- **Tech:** Python, FastAPI, HNSW, Vector Search, Docker, CI

- **[Mini Cache](https://github.com/Melsso/mini_cache)**
	- A distributed, Redis-wire-compatible (RESP2) key-value cache built from scratch in Python/asyncio. Supports TTL-based expiry, AOF persistence, primary/replica replication with heartbeat-based failover detection, and client-side consistent-hashing sharding across multiple nodes. Deployable via Docker Compose as a multi-shard cluster.
	- **Tech:** Python, asyncio, RESP2, Consistent Hashing, Docker Compose

- **[Transcendence](https://github.com/Melsso/Transcendence)**
	- A full-stack, real-time multiplayer web application recreating and extending the classic Pong game, featuring user authentication, matchmaking, live gameplay, and social interaction. *(In progress)*
	- **Tech:** Django, PostgreSQL, Daphne, WebSocket, Redis, Docker Compose

## Resume

You can find my resume in the `img/` folder of this repository, or download it directly from the [live site](#).

## Contact

Feel free to reach out via [LinkedIn](https://linkedin.com/in/sofiane-mallem-b87302170) or email me at sofiane.mallem.07@gmail.com.
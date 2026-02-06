# Bookstore Microservices Architecture

A robust microservices-based application built with Node.js, Express, and Nginx. This project demonstrates a scalable architecture using an API Gateway, containerized services, and automated data management with Prisma and Redis.

## 🏗 Architecture Overview

The system follows a classic microservices pattern with a centralized entry point and isolated service domains.

### Components
1.  **API Gateway (Nginx)**: The single entry point for all client requests. It handles routing to the appropriate microservices based on URL patterns.
2.  **Auth Service**: A Node.js & Express service responsible for user registration, login, and JWT token issuance.
3.  **Cache & Session Store (Redis)**: Used for fast session management, token tracking, and caching frequently accessed data.
4.  **Databases**: Dedicated PostgreSQL instances for service isolation (Database-per-Service pattern).
5.  **Docker Compose**: Orchestrates the entire ecosystem including networking and volume persistence.

## 🚀 Dataflow & Information Stream

The flow of information through the system is designed for high performance and security:

1.  **Request Entry**: Clients send requests to the Nginx Gateway (Port `8080`).
2.  **Reverse Proxying**: Nginx inspects the path and routes requests to the internal services.
3.  **Service Processing**: The target microservice processes the request:
    *   Uses **Prisma ORM** for type-safe database interactions with PostgreSQL.
    *   Uses **ioredis** for fast data retrieval and session state management.
4.  **Authentication Stream**: 
    *   **Login**: On successful login, the `auth-service` generates a **JWT** and stores it in **Redis** indexed by the `userId` with a TTL (expiration).
    *   **Authorization**: The client includes the token in the `Authorization: Bearer <token>` header for protected requests.
    *   **Logout**: When a user logs out (`/api/auth/logout`), their session token is deleted from Redis, effectively ending the active session.
5.  **Response**: The service returns JSON data (and tokens where applicable) back through the gateway to the client.

## 🛠 Tech Stack

*   **Runtime**: Node.js (v24+)
*   **Framework**: Express.js (TypeScript)
*   **Database**: PostgreSQL
*   **Cache/Session**: Redis (v7-alpine)
*   **ORM**: Prisma
*   **Gateway**: Nginx
*   **Dev Tools**: tsx (TypeScript Execution), Docker Desktop

## 📥 Getting Started

### Prerequisites
*   Docker & Docker Compose installed.

### Installation & Execution
1.  **Build and Start**:
    ```bash
    docker compose up -d --build
    ```
2.  **Verify Services**:
    ```bash
    docker compose ps
    ```
3.  **Access Documentation**:
    *   Swagger UI: `http://localhost:8080/api/auth/api-docs`
    *   Health Check: `http://localhost:8080/api/health`

## 📡 Network Topology

The project uses a private bridge network (`bookstore-network`) to allow services to communicate using their container names while exposing necessary ports to the host machine.

*   `gateway`: 8080 (External) -> 80 (Internal)
*   `redis`: 6379 (External/Internal)
*   `auth-db`: 5433 (External) -> 5432 (Internal)
*   `auth-test-db`: 5434 (External) -> 5432 (Internal)

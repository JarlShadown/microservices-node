# Bookstore Microservices Architecture

A robust microservices-based application built with Node.js, Express, and Nginx. This project demonstrates a scalable architecture using an API Gateway, containerized services, and automated data management with Prisma and Redis.

## 🏗 Architecture Overview

The system follows a classic microservices pattern with a centralized entry point and isolated service domains.

### Components
1.  **API Gateway (Nginx)**: The single entry point (Port `8080`). Handles routing, load balancing (expandable), and path-based forwarding.
2.  **Auth Service**: Handles user registration, login, JWT issuance, and session management.
    *   **Refresh Token Pattern**: Uses a Dual-Token system (15m Access Token + 7d Refresh Token) for improved security.
3.  **Book Service**: Manages the book catalog (CRUD operations). Protected by JWT authentication.
4.  **Cache & Session Store (Redis)**: Stores Refresh Tokens and session metadata for fast validation and invalidation.
5.  **Databases**: Service-isolated PostgreSQL instances (`auth-db` and `book-db`).
6.  **Docker Compose**: Orchestrates the entire ecosystem including networking and volume persistence.

## 🚀 Dataflow & Information Stream

1.  **Request Entry**: Clients send requests to the Nginx Gateway (Port `8080`).
2.  **Reverse Proxying**:
    *   `/api/auth/*` → Routed to `auth-service` (Port `3000`).
    *   `/api/books/*` → Routed to `book-service` (Port `4000`).
3.  **Authentication Stream**: 
    *   **Login**: `auth-service` generates an Access Token (JWT) and a Refresh Token (UUID). The Refresh Token is stored in **Redis**.
    *   **Accessing Protected Routes**: Clients include the JWT in the `Authorization: Bearer <token>` header. The `book-service` validates this token locally or against Redis.
    *   **Token Refresh**: When the JWT expires (15m), the client calls `/api/auth/refresh-token` with the Refresh Token to get a new JWT.
    *   **Logout**: Removes the Refresh Token from Redis, effectively invalidating the session.

## 🛠 Tech Stack

*   **Runtime**: Node.js (v24+)
*   **Framework**: Express.js (TypeScript)
*   **Database**: PostgreSQL (v16)
*   **Cache/Session**: Redis (v7-alpine)
*   **ORM**: Prisma (v7+)
*   **Gateway**: Nginx
*   **Dev Tools**: tsx, Docker Desktop, Swagger

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

## 📡 Service Reference & Documentation

| Service | Path Prefix | Documentation (Swagger) | Health Check |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth` | `http://localhost:8080/api/auth/api-docs` | `/api/auth/health` |
| **Books** | `/api/books` | `http://localhost:8080/api/books/api-docs` | `/api/books/health` |

## 🌐 Network Topology (External Mapping)

*   `Gateway`: `8080`
*   `Auth DB`: `5433`
*   `Auth Test DB`: `5434`
*   `Book DB`: `5435`
*   `Redis`: `6379`

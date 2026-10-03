# Backend Blog API

A Node.js + Express REST API for a simple blog application with user authentication, blog posts, and comments. The project uses PostgreSQL as the database and Prisma as the ORM.

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, and delete blog posts
- Add and fetch comments on posts
- Prisma-powered database modeling and migrations
- RESTful API structure using Express

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```bash
backend-blog-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── server.js
├── .env
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- PostgreSQL installed and running
- A PostgreSQL database created

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root if it does not already exist.

Example:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/blog_api?schema=public"
JWT_ACCESS_SECRET="your_super_secret_access_key"
JWT_REFRESH_SECRET="your_super_secret_refresh_key"
```

## Database Setup

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

If you want to start fresh:

```bash
npx prisma migrate reset
```

## Run the Server

Development mode:

```bash
npm run dev
```

The server will start on:

```bash
http://localhost:3000
```

## API Endpoints

### Authentication

#### Register a user

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "12345678"
}
```

#### Login a user

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

Response includes an access token:

```json
{
  "message": "Login successful",
  "accessToken": "...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Posts

#### Get all posts

```http
GET /api/posts
```

Optional query params:

- `search`
- `published=true|false`
- `page`
- `limit`

#### Create a post

```http
POST /api/posts
```

Headers:

```http
Authorization: Bearer <token>
```

Request body:

```json
{
  "title": "My First Blog Post",
  "content": "This is the content of the blog post."
}
```

#### Update a post

```http
PATCH /api/posts/:id
```

Headers:

```http
Authorization: Bearer <token>
```

#### Delete a post

```http
DELETE /api/posts/:id
```

Headers:

```http
Authorization: Bearer <token>
```

### Comments

#### Create a comment

```http
POST /api/posts/:postId/comments
```

Headers:

```http
Authorization: Bearer <token>
```

Request body:

```json
{
  "content": "Nice post!",
  "authorId": 1
}
```

#### Get comments for a post

```http
GET /api/posts/:postId/comments
```

Headers:

```http
Authorization: Bearer <token>
```

#### Delete a comment

```http
DELETE /api/posts/:postId/comments/:commentId
```

Headers:

```http
Authorization: Bearer <token>
```

## Authentication Usage

Most protected routes require a bearer token in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_access_token>
```

## Prisma Schema

The database includes tables for:

- `User`
- `Post`
- `Comment`

Relations are defined as:

- One user can have many posts
- One user can have many comments
- One post can have many comments

## Example Requests

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"12345678"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"12345678"}'
```

### Create Post

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Hello World","content":"This is my first post."}'
```

## Notes

- This API currently stores app configuration values in `.env`.
- Ensure the database is running before starting the server.
- The project uses Prisma migrations to manage schema changes.

## License

This project is licensed under the ISC license.

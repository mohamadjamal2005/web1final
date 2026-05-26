# Web1 Final Exam

A modern full-stack authentication application built with Next.js and Express.js.

## Features

- JWT Authentication
- Protected Dashboard
- Email OTP 2FA
- Cloudflare Turnstile Bot Protection
- Secure HttpOnly Cookies
- Responsive UI
- GitHub CI Pipeline
- Frontend Deployment with Vercel
- Backend Deployment with Railway

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Sonner
- Lucide React

## Backend

- Express.js
- JWT
- CORS
- Cookie Parser
- Resend Email API

## Deployment

- Vercel
- Railway

---

# Project Structure

```bash
web1final/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

# Authentication Flow

```text
1. User enters email and password
2. Cloudflare Turnstile verification
3. Backend validates credentials
4. OTP email sent using Resend
5. User verifies OTP
6. JWT token created
7. Protected dashboard access granted
```

---

# Environment Variables

## Frontend

Create:

```bash
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_TURNSTILE_SITE_KEY=YOUR_TURNSTILE_SITE_KEY
```

---

## Backend

Create:

```bash
backend/.env
```

Add:

```env
PORT=5000

JWT_SECRET=your_secret_key

TURNSTILE_SECRET_KEY=your_turnstile_secret

RESEND_API_KEY=your_resend_api_key

NODE_ENV=development
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/mohamadjamal2005/web1final
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Production Deployment

## Frontend

Deploy using:

- Vercel

## Backend

Deploy using:

- Railway

---

# CI Pipeline

GitHub Actions automatically:

- installs dependencies
- builds frontend
- checks backend

Pipeline file:

```bash
.github/workflows/ci.yml
```

---

# Security Features

- JWT Authentication
- HttpOnly Cookies
- OTP Verification
- Cloudflare Turnstile
- CORS Protection
- Secure Production Cookies

---

# Important Notes

## Local Development Cookies

```js
secure: false
sameSite: "lax"
```

## Production Cookies

```js
secure: true
sameSite: "none"
```

---

# Available Scripts

## Frontend

```bash
npm run dev
npm run build
npm run start
```

## Backend

```bash
npm run dev
npm run start
```

---

# Git Workflow

## Development Branch

```text
dev
```

Used for development and testing.

## Production Branch

```text
main
```

Used for stable production deployments.

---

# Future Improvements

- Database Integration
- Register System
- Password Hashing
- Refresh Tokens
- Role-Based Authentication
- Admin Dashboard
- Redis OTP Storage
- Docker Support
- Monitoring & Logging

---

# License

This project is for educational and learning purposes.
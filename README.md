# Quiz Builder

A full-stack quiz creation and management application built with Next.js, NestJS, PostgreSQL, and Docker.

## Overview

This application allows users to create, manage, and view quizzes with different question types including multiple choice, true/false, and text-based questions.

## Architecture

- **Frontend**: Next.js 15.5.4 with TypeScript
- **Backend**: NestJS with TypeScript  
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose

## Prerequisites

Before running this project, ensure you have the following installed:

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Node.js**: Version 18.0 or higher (for local development)
- **npm**: Version 8.0 or higher

### Docker Installation

**Windows:**
- Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
- Install and restart your computer
- Verify installation: `docker --version`

**macOS:**
- Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
- Verify installation: `docker --version`

**Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install docker.io

# Install Docker Compose
sudo apt-get install docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
```

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd quiz-builder
```

### 2. Environment Setup

The project uses environment variables that are already configured in the Docker setup. No additional `.env` files are required for Docker deployment.

### 3. Run with Docker Compose

Start all services (database, backend, frontend) with a single command:

```bash
docker-compose up -d
```

This command will:
- Pull/rebuild Docker images if needed
- Start PostgreSQL database on port 5432
- Start NestJS backend API on port 3001  
- Start Next.js frontend on port 3002
- Set up proper networking between services

### 4. Access the Application

- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

### 5. Verify Installation

Check that all containers are running:

```bash
docker-compose ps
```

You should see:
- `quiz-builder-postgres-1`: Healthy
- `quiz-builder-backend-1`: Running  
- `quiz-builder-frontend-1`: Running

## Development Setup

For local development without Docker:

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start PostgreSQL database (Docker)
docker run --name quiz-postgres -e POSTGRES_DB=quiz_builder -e POSTGRES_USER=quiz_user -e POSTGRES_PASSWORD=quiz_password -p 5432:5432 -d postgres:15-alpine

# Run database migrations
npm run migration:dev

# Start development server
npm run start:dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set environment variable
export NEXT_PUBLIC_API_URL=http://localhost:3001

# Start développement server
npm run dev
```

## Available Scripts

### Backend Scripts

```bash
npm run build          # Build production files
npm run start          # Start production server
npm run start:dev      # Start development server with hot reload
npm run migration:dev  # Run database migrations
npm run lint           # Run ESLint
npm run test           # Run tests
```

### Frontend Scripts

```bash
npm run build          # Build production files
npm run start          # Start production server
npm run dev            # Start development server
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript type checking
```

## API Endpoints

The backend provides the following REST API endpoints:

### Quizzes

- `GET /quizzes` - Get all quizzes (summary)
- `POST /quizzes` - Create a new quiz
- `GET /quizzes/:id` - Get a specific quiz with questions
- `DELETE /quizzes/:id` - Delete a quiz

### Example API Usage

```bash
# Create a quiz
curl -X POST http://localhost:3001/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "quizTitle": "Math Quiz",
    "questions": [
      {
        "queue": 1,
        "question": "What is 2+2?",
        "type": "MULTIPLE_CHOICE",
        "correctAnswer": "4",
        "options": ["3", "4", "5", "6"]
      }
    ]
  }'

# Get all quizzes
curl http://localhost:3001/quizzes

# Get specific quiz
curl http://localhost:3001/quizzes/{id}

# Delete quiz
curl -X DELETE http://localhost:3001/quizzes/{id}
```

## Project Structure

```
quiz-builder/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── quiz/           # Quiz module (controller, service, DTOs)
│   │   ├── app.module.ts   # Root module
│   │   ├── main.ts         # Application entry point
│   │   └── prisma.service.ts
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   ├── Dockerfile          # Backend Docker configuration
│   └── package.json
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js app router
│   │   │   ├── create/     # Quiz creation page
│   │   │   ├── quizzes/    # Quiz list and detail pages
│   │   │   └── page.tsx    # Home page
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── types/          # TypeScript type definitions
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json
├── docker-compose.yml       # Multi-service configuration
└── README.md
```

## Database Schema

### Quiz Table
- `id`: String (UUID) - Primary key
- `title`: String - Quiz title
- `createdAt`: DateTime - Creation timestamp
- `updatedAt`: DateTime - Last update timestamp

### Question Table  
- `id`: String (CUID) - Primary key
- `question`: String - Question text
- `type`: QuestionType - Question type (MULTIPLE_CHOICE, TRUE_OR_FALSE, TEXT)
- `queue`: Integer - Question order
- `options`: String[] - Available options (for multiple choice)
- `correctAnswer`: String - Correct answer
- `quizId`: String - Foreign key to Quiz
- `createdAt`: DateTime - Creation timestamp
- `createdAt`: DateTime - Last update timestamp

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Check what's using ports 3001, 3002, 5432
netstat -tulpn | grep :3001
netstat -tulpn | grep :3002  
netstat -tulpn | grep :5432

# Stop conflicting processes or change ports in docker-compose.yml
```

**Database Connection Issues**
```bash
# Restart PostgreSQL container
docker-compose restart postgres

# Check database logs
docker-compose logs postgres

# Reset database
docker-compose exec backend npx prisma migrate reset --force
```

**Frontend Not Loading**
```bash
# Check frontend logs
docker-compose logs frontend

# Restart frontend
docker-compose restart frontend

# Clear Next.js cache
docker-compose exec frontend rm -rf .next
```

### Reset Everything

To completely reset the project:

```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Rebuild and start
docker-compose up --build -d
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test your changes: `npm run test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the application logs: `docker-compose logs`
3. Create an issue on GitHub with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Docker version, etc.)
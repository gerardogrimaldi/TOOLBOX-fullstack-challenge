# Toolbox Challenge - Full Stack Application

This is a full-stack JavaScript application that consists of a Node.js API and a React frontend. The application fetches CSV files from an external API, processes them, and displays their contents in a formatted way.

## Project Structure

The project is organized into two main parts:

- `api`: Backend API built with Node.js and Express
- `client`: Frontend application built with React and Bootstrap

## Requirements

- Node.js 14.x for the API
- Node.js 16.x for the client

## Quick Start

### Starting the API

```bash
cd api
npm install
npm start
```

The API will be available at http://localhost:3001.

### Starting the Client

In a new terminal:

```bash
cd client
npm install
npm start
```

The client application will be available at http://localhost:3000.

## Docker Deployment

You can easily run both the API and client using Docker Compose:

```bash
# Build and start both services
docker-compose up -d

# To rebuild the images if needed
docker-compose up -d --build
```

The services will be available at:
- Client: http://localhost:3000
- API: http://localhost:3001

To stop all services:
```bash
docker-compose down
```

### Running Individual Docker Containers

You can also build and run each service separately:

#### API
```bash
cd api
docker build -t toolbox-api .
docker run -p 3001:3001 toolbox-api
```

#### Client
```bash
cd client
docker build -t toolbox-client .
docker run -p 3000:3000 toolbox-client
```

## Features

- API that processes CSV files from an external service
- Frontend that displays file data in a clean, tabular format
- Filter functionality to show data from specific files
- Responsive UI built with React Bootstrap

## API Endpoints

- `GET /files/data`: Get formatted data from all CSV files
- `GET /files/data?fileName=file1.csv`: Get formatted data from a specific file
- `GET /files/list`: Get list of available files

## Testing

### API Tests

```bash
cd api
npm install
npm test
```

The API tests use Mocha and Chai to test the endpoints, controllers, and services.

### Frontend Tests

```bash
cd client
npm install
npm test
```

The frontend tests use Jest and React Testing Library to test the React components and their functionality.

To run tests in watch mode during development:

```bash
npm run test:watch
```

## Implementation Details

### API

- Built with Express.js
- Includes error handling and data validation
- Tests written with Mocha and Chai

### Frontend

- Built with React (using functional components and hooks)
- UI styled with React Bootstrap
- Responsive design for all screen sizes

## Author

Gerardo Germán Grimaldi
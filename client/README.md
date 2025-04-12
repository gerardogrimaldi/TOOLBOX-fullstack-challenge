# Client for Toolbox Challenge

This is the frontend application for displaying file data from the Toolbox API. It's built with React and Bootstrap.

## Requirements

- Node.js 16.x

## Installation

```bash
npm install
```

## Running the Client

To start the development server:

```bash
npm start
```

The application will be available at http://localhost:3000.

## Docker Deployment

### Building and Running with Docker

To build and run the application using Docker:

```bash
# Build the Docker image
docker build -t toolbox-client .

# Run the container
docker run -p 3000:3000 toolbox-client
```

The application will be available at http://localhost:3000.

To stop the container:

```bash
# Find the container ID
docker ps

# Stop the container
docker stop <container_id>
```

## Testing

To run the tests:

```bash
npm test
```

To run tests in watch mode (useful during development):

```bash
npm run test:watch
```

## Features

- Display formatted data from CSV files
- Filter data by file name
- Responsive design using React Bootstrap

## Architecture

This application is built with:

- React 17.x (with Hooks)
- React Bootstrap 2.x for UI components
- Webpack 5.x for bundling
- Axios for API requests
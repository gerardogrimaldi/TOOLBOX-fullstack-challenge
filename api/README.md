# API for Toolbox Challenge

This API serves as a middleware between the client application and the external Toolbox API. It processes CSV files and reformats the data according to the requirements.

## Requirements

- Node.js 14.x

## Installation

```bash
npm install
```

## Running the API

To start the API server:

```bash
npm start
```

The server will start on port 3001 by default.

## Docker Deployment

### Building and Running with Docker

To build and run the API using Docker:

```bash
# Build the Docker image
docker build -t toolbox-api .

# Run the container
docker run -p 3001:3001 toolbox-api
```

The API will be available at http://localhost:3001.

To stop the container:

```bash
# Find the container ID
docker ps

# Stop the container
docker stop <container_id>
```

## Development Mode

To run the server in development mode with auto-restart on file changes:

```bash
npm run dev
```

## Testing

To run the tests:

```bash
npm test
```

## API Endpoints

### GET /files/data

Returns the formatted data from all CSV files. The endpoint processes all available files from the external API, parses their contents, and returns a formatted JSON response.

#### Query Parameters

- `fileName` (optional): Filter results to include only data from the specified file name.

#### Response Example

```json
[
  {
    "file": "file1.csv",
    "lines": [
      {
        "text": "RgTya",
        "number": 64075909,
        "hex": "70ad29aacf0b690b0467fe2b2767f765"
      },
      {
        "text": "AtjW",
        "number": 6,
        "hex": "d33a8ca5d36d3106219f66f939774cf5"
      }
    ]
  }
]
```

### GET /files/list

Returns the list of all available files from the external API.

#### Response Example

```json
{
  "files": [
    "file1.csv",
    "file2.csv",
    "file3.csv"
  ]
}
```
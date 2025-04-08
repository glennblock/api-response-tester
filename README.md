API Response Tester

A simple, configurable webhook server that returns static NDJSON responses. This server accepts any URL and returns a configurable response payload in Newline Delimited JSON (NDJSON) format.

## Features

- Accepts any URL path
- Returns configurable responses
- Easy to modify response content without code changes
- Supports template variables (e.g., `{{timestamp}}`)
- Configurable content type and response file

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd discovery-webhook
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The server is configured through two main files:

### 1. response.json
This file contains the server configuration:
```json
{
  "contentType": "application/x-ndjson",
  "responseFile": "response.txt"
}
```

- `contentType`: The Content-Type header for responses
- `responseFile`: The file containing the response payload

### 2. response.txt
This file contains the actual response payload in NDJSON format. Each line should be a valid JSON object. Example:
```json
{"url": "https://example.com/item1", "type": "document", "timestamp": "{{timestamp}}"}
{"url": "https://example.com/item2", "type": "image", "timestamp": "{{timestamp}}"}
```

Template variables like `{{timestamp}}` will be replaced with actual values at runtime.

## Usage

1. Start the server:
```bash
npm start
```

2. The server will run on port 3000 by default. You can change this by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

3. Access any URL on the server to receive the configured response:
```bash
curl http://localhost:3000/any/path
```

## Example Response

The server will return responses in NDJSON format:
```json
{"url": "https://example.com/item1", "type": "document", "timestamp": "2024-03-21T12:34:56.789Z"}
{"url": "https://example.com/item2", "type": "image", "timestamp": "2024-03-21T12:34:56.789Z"}
```

## Modifying the Response

To change the response:
1. Edit `response.txt` to modify the payload
2. Edit `response.json` to change the content type or response file
3. No server restart is required for changes to take effect

## Error Handling

The server includes basic error handling:
- Returns 500 status code for internal errors
- Provides fallback configuration if `response.json` is missing
- Logs errors to the console

## License

Apache 2
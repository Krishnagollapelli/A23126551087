# Telemetry Tracking Middleware

A lightweight and independent logging utility designed to capture application events and forward them to the centralized evaluation platform. The middleware operates separately from business logic, making it easy to integrate across different modules while maintaining consistent observability.

## Features

* Centralized event tracking
* Structured log formatting
* Lightweight and framework-agnostic design
* Automatic transmission to the evaluation service
* Support for multiple severity levels

## Log Structure

Every log entry follows a standardized schema:

| Field     | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| level     | String | Severity of the event            |
| component | String | Source module generating the log |
| message   | String | Detailed event description       |

### Supported Values

#### Level

* info
* warn
* error

#### Component

* ui
* api
* state

## Example

```json
{
  "level": "info",
  "component": "ui",
  "message": "Short URL created successfully"
}
```

## Environment Configuration

Before running the application, configure the following environment variables:

```env
VITE_API_URL=https://your-evaluation-service.com
VITE_AUTH_TOKEN=your_bearer_token
```

### Variable Details

| Variable        | Purpose                                  |
| --------------- | ---------------------------------------- |
| VITE_API_URL    | Endpoint used for log transmission       |
| VITE_AUTH_TOKEN | JWT Bearer token used for authentication |

## Getting Started

1. Configure the required environment variables.
2. Import the middleware into your application.
3. Send logs using the standardized schema.
4. Verify successful delivery through the evaluation service.

## Authentication

All requests to the evaluation service require a valid Bearer token. Logs generated without proper credentials will be rejected with a `401 Unauthorized` response.

## Best Practices

* Use `info` for general application events.
* Use `warn` for recoverable issues.
* Use `error` for failures and unexpected conditions.
* Keep messages concise and meaningful.
* Avoid logging sensitive user information.

```
```

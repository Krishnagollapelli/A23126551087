# URL Shortener & Logging Platform

A modern Single Page Application (SPA) built using React, Vite, and Material UI for creating and managing shortened URLs. The platform includes URL analytics, client-side redirection tracking, local persistence, and a dedicated telemetry system for monitoring application events.

---

## Overview

The project consists of two independent modules working together:

### Frontend Application

**notification-app-fe**

The primary React application responsible for:

* URL shortening
* Statistics dashboard
* Search and filtering
* Click tracking
* User interactions
* Local data management

Runs on:

```text id="u2j6z5"
http://localhost:3000
```

### Logging Middleware

**logging-middleware**

A lightweight telemetry service that:

* Captures application events
* Tracks user actions
* Records errors and warnings
* Sends structured logs to the evaluation service

---

## Technology Stack

* React
* Vite
* Material UI
* TypeScript
* Local Storage
* Custom Logging Middleware

---

## Project Structure

```text id="nct4m5"
project-root
│
├── notification-app-fe
│   ├── src
│   ├── components
│   ├── hooks
│   ├── services
│   └── pages
│
└── logging-middleware
    ├── logger
    ├── transport
    └── utils
```

---

## Local Setup

### 1. Clone the Repository

```bash id="mcr7rw"
git clone <repository-url>
cd notification-app-fe
```

### 2. Install Dependencies

```bash id="ffsm2h"
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `notification-app-fe` directory.

```env id="6m5xmd"
VITE_API_URL=http://4.224.186.213/evaluation-service/logs
VITE_AUTH_TOKEN=your_bearer_token
```

### Environment Variables

| Variable        | Description                                     |
| --------------- | ----------------------------------------------- |
| VITE_API_URL    | Logging service endpoint                        |
| VITE_AUTH_TOKEN | Authorization token used for telemetry requests |

---

## Running the Application

Start the development server:

```bash id="vwukwl"
npm run dev
```

The application will be available at:

```text id="pm3gbj"
http://localhost:3000
```

---

## Key Features

### URL Management

* Generate short URLs
* Custom shortcode support
* Expiration management
* URL validation

### Analytics

* Click tracking
* URL statistics
* Activity monitoring
* Expiration insights

### Search & Sorting

* Search by URL
* Search by shortcode
* Sort by creation date
* Sort by click count
* Sort by expiration time

### Telemetry System

* Real-time logging
* Event tracking
* Error monitoring
* Evaluation service integration

---

## Logging Flow

```text id="kt9m8j"
User Action
      │
      ▼
Application Event
      │
      ▼
Logging Middleware
      │
      ▼
Evaluation Service
      │
      ▼
Telemetry Storage
```

---

## Authentication

The logging service requires a valid Bearer Token.

Requests made without a valid token will return:

```text id="y6s6x4"
401 Unauthorized
```

Ensure the `VITE_AUTH_TOKEN` value is configured correctly before running the application.

---

## Future Enhancements

* Backend database integration
* User authentication
* Real-time dashboards
* Advanced analytics
* Cloud synchronization
* Role-based access control

---

## License

This project is developed for academic evaluation and demonstration purposes.

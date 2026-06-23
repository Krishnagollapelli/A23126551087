# URL Shortener System Design

## Introduction

The URL Shortener System is a client-side web application that enables users to generate compact URLs from lengthy web addresses. The application supports custom shortcodes, configurable expiration periods, click tracking, analytics, and local data persistence while maintaining a modular and scalable architecture.

---

# Key Features

* Generate short URLs from long URLs
* Support custom shortcodes
* Configure URL validity periods
* Track URL usage statistics
* Search and filter URL records
* Sort URLs based on different criteria
* Maintain persistent storage using Local Storage
* Capture application events through logging middleware

---

# System Architecture

```text
Presentation Layer
        │
        ▼
    React Components
        │
        ▼
  Custom Hooks & State
        │
        ▼
    Service Layer
        │
        ▼
   Local Storage
```

---

# Core Modules

## 1. URL Management Interface

Provides the primary user interaction layer.

Responsibilities:

* Create short URLs
* Display generated URLs
* Show URL statistics
* Handle user actions and validations

---

## 2. Search & Filter Module

Allows users to quickly locate stored URLs.

Capabilities:

* Search by shortcode
* Search by original URL
* Dynamic filtering of records

---

## 3. State Management Layer

Implemented through custom React hooks.

Handles:

* Application state
* URL creation workflow
* Statistics calculation
* Search operations
* Sorting operations
* Logging integration

---

## 4. Service Layer

Acts as the application's business logic layer.

Functions:

* URL generation
* Data retrieval
* Statistics updates
* Local storage synchronization
* Validation processing

---

## 5. Logging Middleware

Provides centralized application monitoring.

Tracks:

* User interactions
* System events
* URL creation requests
* Data operations
* Error conditions

---

# URL Entity Model

```json
{
  "longUrl": "https://example.com",
  "shortcode": "abc123",
  "createdAt": "2026-01-01T10:00:00Z",
  "expiresAt": "2026-01-01T10:30:00Z",
  "clickCount": 0
}
```

## Attribute Description

| Attribute  | Purpose                     |
| ---------- | --------------------------- |
| longUrl    | Original destination URL    |
| shortcode  | Unique shortened identifier |
| createdAt  | URL creation timestamp      |
| expiresAt  | URL expiration timestamp    |
| clickCount | Number of redirect visits   |

---

# URL Creation Workflow

```text
User Input
    │
    ▼
Validate URL
    │
    ▼
Generate / Verify Shortcode
    │
    ▼
Calculate Expiration Time
    │
    ▼
Persist URL Record
    │
    ▼
Update Statistics
    │
    ▼
Create Log Event
```

---

# Search Workflow

```text
Search Query
     │
     ▼
Apply Filter
     │
     ▼
Match Records
     │
     ▼
Render Results
```

---

# Sorting Workflow

Supported Options:

* Newest First
* Oldest First
* Highest Click Count
* Nearest Expiration

```text
Select Sort Option
        │
        ▼
Sort URL Records
        │
        ▼
Update Interface
```

---

# Analytics Dashboard

The analytics section displays:

* Total URLs Generated
* Active URLs
* Expired URLs
* Total Clicks
* Creation Time
* Expiration Time

### Future Enhancements

* Daily traffic reports
* Popular URL analysis
* Click trend visualization
* User-specific analytics

---

# Data Persistence Strategy

The application stores data in browser Local Storage.

## Advantages

* Fast data retrieval
* No backend dependency
* Offline availability
* Persistent across refreshes

### Persistence Flow

```text
Create URL
    │
    ▼
Save to Local Storage
    │
    ▼
Reload Application
    │
    ▼
Restore Data
```

---

# Logging Architecture

Application logs are generated for:

* URL creation events
* Statistics updates
* Search operations
* User interactions
* Validation failures
* Runtime errors

Example:

```json
{
  "level": "info",
  "component": "ui",
  "message": "Short URL generated successfully"
}
```

---

# Security Measures

The system incorporates:

* URL format validation
* Input sanitization
* Shortcode uniqueness checks
* Expiration validation
* Error handling mechanisms
* Secure token-based logging authentication

---

# Scalability Roadmap

Potential future improvements include:

* Cloud database integration
* User authentication
* Real-time analytics dashboard
* Distributed logging infrastructure
* Dedicated click tracking service
* Role-based access control
* Multi-device synchronization

---

# Conclusion

The URL Shortener System delivers a lightweight and modular solution for generating, managing, and monitoring shortened URLs. Its architecture promotes maintainability, extensibility, and efficient performance while providing a solid foundation for future enhancements and large-scale deployments.

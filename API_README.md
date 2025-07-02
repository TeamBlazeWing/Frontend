# SimplyTix API Integration Guide

## Overview
Both Dashboard and Event components now fully support API integration with fallback to local data sources.

## API Endpoints

### Base URL: `http://localhost:3000/simplytix`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/Event` | Fetch all events |
| GET | `/Event/:id` | Fetch specific event |
| POST | `/Event` | Create new event |
| PUT | `/Event/:id` | Update existing event |
| DELETE | `/Event/:id` | Delete event |
| POST | `/subscribe` | Subscribe/Unsubscribe to event |

## Components Updated

### Dashboard Component
- ✅ **API Integration**: Fetches events from `/simplytix/Event`
- ✅ **Fallback Support**: Falls back to local `/events.json` if API fails
- ✅ **Subscribe/Unsubscribe**: Full subscription management via API
- ✅ **Error Handling**: Graceful error handling with user feedback
- ✅ **Loading States**: Visual loading indicators

### Event Component  
- ✅ **Full CRUD**: Create, Read, Update, Delete via API
- ✅ **API Integration**: All operations use API endpoints
- ✅ **Fallback Support**: Falls back to local data if API fails
- ✅ **Subscribe/Unsubscribe**: Subscription management via API
- ✅ **Error Handling**: Comprehensive error handling
- ✅ **Loading States**: Loading indicators for all operations

## Quick Start

### 1. Start the Mock API Server
```bash
npm run api
```

### 2. Start the React Development Server
```bash
npm run dev
```

### 3. Test the Integration
- Visit `http://localhost:5173/dashboard` to test Dashboard API integration
- Visit `http://localhost:5173/events` to test Event CRUD operations

## API Request Examples

### Subscribe/Unsubscribe Request
```javascript
POST /simplytix/subscribe
Content-Type: application/json

{
  "eventId": 1,
  "userId": "john_doe",
  "isSubscribed": true  // true to subscribe, false to unsubscribe
}
```

### Create Event Request
```javascript
POST /simplytix/Event
Content-Type: application/json

{
  "title": "New Event",
  "description": "Event description",
  "date": "2024-07-01T19:00:00Z",
  "location": "Event Location",
  "price": 25,
  "district": "Downtown",
  "type": "Music",
  "volunteer": "Jane Doe",
  "imageUrl": "https://example.com/image.jpg"
}
```

## Error Handling

Both components implement comprehensive error handling:

1. **API Unavailable**: Automatically falls back to local data
2. **Network Errors**: Shows user-friendly error messages
3. **Server Errors**: Graceful degradation with retry options
4. **Loading States**: Visual feedback during API calls

## Features

- **Real-time Updates**: Local state updates immediately for better UX
- **Optimistic UI**: UI updates before API confirmation
- **Visual Feedback**: Loading spinners and status indicators
- **Fallback System**: Seamless transition between API and local data
- **Error Recovery**: Retry mechanisms and error reporting
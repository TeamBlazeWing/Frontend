# Event CRUD API Integration Instructions

## Overview
The Event component now supports full CRUD operations with the `http://localhost:3000/simplytix/Event` API.

## Features Implemented

### ✅ **CREATE Event**
- Click "Create Event" button
- Fill out the form with all required fields
- Submits POST request to `/simplytix/Event`
- Shows loading state during creation

### ✅ **READ Events**
- Fetches events from `/simplytix/Event` on page load
- Falls back to local `/events.json` if API is unavailable
- Shows loading spinner during fetch

### ✅ **UPDATE Event**
- Click any event card to open details modal
- Click edit button (pencil icon)
- Modify fields in the form
- Submits PUT request to `/simplytix/Event/:id`
- Shows loading state during update

### ✅ **DELETE Event**
- Click any event card to open details modal
- Click delete button (trash icon)
- Confirm deletion in popup
- Submits DELETE request to `/simplytix/Event/:id`
- Shows loading state during deletion

### ✅ **SUBSCRIBE/UNSUBSCRIBE to Event**
- Click any event card to open details modal
- Click "Subscribe" button to subscribe or "Unsubscribe" button to unsubscribe
- Submits POST request to `/simplytix/subscribe` with `isSubscribed` flag
- Updates subscription status locally and shows visual feedback
- Button changes color and text based on subscription status
- Shows loading spinner during subscription changes

## API Endpoints Used

```
GET    /simplytix/Event          - Fetch all events
POST   /simplytix/Event          - Create new event
PUT    /simplytix/Event/:id      - Update existing event
DELETE /simplytix/Event/:id      - Delete event
POST   /simplytix/subscribe      - Subscribe/Unsubscribe to event
```

## Testing the API

### Option 1: Use the Mock Server

1. **Install server dependencies**:
   ```bash
   npm install express cors
   ```

2. **Start the mock server**:
   ```bash
   node mock-server.js
   ```

3. **Start the React app** (in another terminal):
   ```bash
   npm run dev
   ```

### Option 2: Use Your Own Backend

Replace the API URLs in the Event component with your actual backend endpoints.

## Error Handling

- **API Failures**: Shows error messages and falls back to local data
- **Network Issues**: Graceful degradation with user feedback
- **Loading States**: Visual indicators during all operations
- **Validation**: Form validation for required fields

## Key Features

- **Optimistic Updates**: UI updates immediately for better UX
- **Loading Indicators**: Spinners and disabled states during operations
- **Error Recovery**: Fallback to local data if API fails
- **Form Validation**: All required fields validated before submission
- **Confirmation Dialogs**: Delete confirmation to prevent accidents

## Form Fields

When creating/editing events, the following fields are required:
- **Title**: Event name
- **Description**: Event details
- **Date & Time**: When the event occurs
- **Location**: Where the event takes place
- **Price**: Ticket price (number)
- **District**: Event district/area
- **Type**: Event category (Music, Art, Food, etc.)
- **Volunteer**: Assigned volunteer coordinator
- **Image URL**: Event image (valid URL)

## Testing Checklist

- ✅ Create new event via API
- ✅ View events loaded from API
- ✅ Edit existing event via API
- ✅ Delete event via API
- ✅ Subscribe to event via API
- ✅ Handle API failures gracefully
- ✅ Show loading states during operations
- ✅ Validate form inputs before submission
- ✅ Confirm deletions before executing

The Event component is now fully integrated with the API and ready for production use!

// Simple Express.js server for testing SimplyTix API endpoints
// To use this server:
// 1. Install dependencies: npm install express cors
// 2. Run the server: node mock-server.js
// 3. The server will run on http://localhost:3000

import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (replace with actual database in production)
let events = [
    {
        "id": 7,
        "title": "Music Concert",
        "description": "Enjoy a night of amazing live music performances.",
        "date": "2024-06-10T19:00:00Z",
        "location": "City Hall",
        "imageUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
        "price": 20,
        "district": "Downtown",
        "type": "Music",
        "volunteer": "John Doe",
        "isSubscribed": false
    },
    {
        "id": 8,
        "title": "Art Exhibition",
        "description": "Explore the latest in modern art.",
        "date": "2024-07-01T17:00:00Z",
        "location": "Art Gallery",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        "price": 10,
        "district": "Uptown",
        "type": "Art",
        "volunteer": "Jane Smith",
        "isSubscribed": true
    },
    {
        "id": 9,
        "title": "Tech Conference",
        "description": "Latest technology trends and innovations.",
        "date": "2024-08-15T09:00:00Z",
        "location": "Convention Center",
        "imageUrl": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        "price": 50,
        "district": "Business District",
        "type": "Technology",
        "volunteer": "Mike Johnson",
        "isSubscribed": false
    },
    {
        "id": 10,
        "title": "Food Festival",
        "description": "Taste amazing local and international cuisines.",
        "date": "2024-09-10T12:00:00Z",
        "location": "Central Park",
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        "price": 15,
        "district": "Downtown",
        "type": "Food",
        "volunteer": "Sarah Wilson",
        "isSubscribed": false
    },
    {
        "id": 11,
        "title": "Sports Tournament",
        "description": "Exciting sports competitions and matches.",
        "date": "2024-10-05T14:00:00Z",
        "location": "Sports Complex",
        "imageUrl": "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
        "price": 25,
        "district": "Sports District",
        "type": "Sports",
        "volunteer": "Alex Brown",
        "isSubscribed": false
    },
    {
        "id": 12,
        "title": "Comedy Show",
        "description": "Laugh out loud with amazing comedians.",
        "date": "2024-11-20T20:00:00Z",
        "location": "Comedy Club",
        "imageUrl": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        "price": 30,
        "district": "Entertainment District",
        "type": "Comedy",
        "volunteer": "Emily Davis",
        "isSubscribed": false
    },
    {
        "id": 13,
        "title": "Book Fair",
        "description": "Discover new books and meet your favorite authors.",
        "date": "2024-07-15T10:00:00Z",
        "location": "Library Plaza",
        "imageUrl": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
        "price": 5,
        "district": "Uptown",
        "type": "Art",
        "volunteer": "Jane Smith",
        "isSubscribed": false
    },
    {
        "id": 14,
        "title": "Startup Pitch Night",
        "description": "Watch startups pitch their ideas to investors.",
        "date": "2024-08-22T18:00:00Z",
        "location": "Innovation Hub",
        "imageUrl": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        "price": 0,
        "district": "Business District",
        "type": "Technology",
        "volunteer": "Mike Johnson",
        "isSubscribed": false
    },
    {
        "id": 15,
        "title": "Wine & Cheese Evening",
        "description": "Sample exquisite wines and cheeses from around the world.",
        "date": "2024-09-18T19:00:00Z",
        "location": "Grand Ballroom",
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        "price": 40,
        "district": "Downtown",
        "type": "Food",
        "volunteer": "Sarah Wilson",
        "isSubscribed": false
    },
    {
        "id": 16,
        "title": "Basketball Finals",
        "description": "Cheer for your favorite team in the finals.",
        "date": "2024-10-12T16:00:00Z",
        "location": "Arena",
        "imageUrl": "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
        "price": 35,
        "district": "Sports District",
        "type": "Sports",
        "volunteer": "Alex Brown",
        "isSubscribed": true
    },
    {
        "id": 17,
        "title": "Stand-up Night",
        "description": "A night of hilarious stand-up comedy.",
        "date": "2024-11-25T21:00:00Z",
        "location": "Laugh House",
        "imageUrl": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        "price": 18,
        "district": "Entertainment District",
        "type": "Comedy",
        "volunteer": "Emily Davis",
        "isSubscribed": false
    },
    {
        "id": 18,
        "title": "Jazz Evening",
        "description": "Smooth jazz performances by renowned artists.",
        "date": "2024-06-20T20:00:00Z",
        "location": "Jazz Bar",
        "imageUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
        "price": 22,
        "district": "Downtown",
        "type": "Music",
        "volunteer": "John Doe",
        "isSubscribed": true
    },
    {
        "id": 19,
        "title": "Photography Workshop",
        "description": "Learn photography from professionals.",
        "date": "2024-07-28T11:00:00Z",
        "location": "Studio 5",
        "imageUrl": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        "price": 30,
        "district": "Uptown",
        "type": "Art",
        "volunteer": "Jane Smith",
        "isSubscribed": false
    }
];

let subscriptions = [];

// GET /simplytix/Event - Get all events
app.get('/simplytix/Event', (req, res) => {
  console.log('GET /simplytix/Event - Fetching all events');
  res.json(events);
});

// GET /simplytix/Event/:id - Get specific event
app.get('/simplytix/Event/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  console.log(`GET /simplytix/Event/${eventId} - Fetching event:`, event.title);
  res.json(event);
});

// POST /simplytix/Event - Create new event
app.post('/simplytix/Event', (req, res) => {
  const newEvent = {
    id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
    ...req.body,
    isSubscribed: false
  };
  
  events.push(newEvent);
  console.log('POST /simplytix/Event - Created new event:', newEvent.title);
  res.status(201).json(newEvent);
});

// PUT /simplytix/Event/:id - Update event
app.put('/simplytix/Event/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  events[eventIndex] = { ...events[eventIndex], ...req.body, id: eventId };
  console.log(`PUT /simplytix/Event/${eventId} - Updated event:`, events[eventIndex].title);
  res.json(events[eventIndex]);
});

// DELETE /simplytix/Event/:id - Delete event
app.delete('/simplytix/Event/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  const deletedEvent = events.splice(eventIndex, 1)[0];
  console.log(`DELETE /simplytix/Event/${eventId} - Deleted event:`, deletedEvent.title);
  res.json({ message: 'Event deleted successfully', event: deletedEvent });
});

// POST /simplytix/subscribe - Subscribe/Unsubscribe to event
app.post('/simplytix/subscribe', (req, res) => {
  const { eventId, userId, isSubscribed } = req.body;
  
  const eventIndex = events.findIndex(e => e.id === eventId);
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  // Update event subscription status
  events[eventIndex].isSubscribed = isSubscribed;
  
  if (isSubscribed) {
    // Add to subscriptions
    const subscription = {
      id: subscriptions.length + 1,
      eventId,
      userId,
      timestamp: new Date().toISOString()
    };
    subscriptions.push(subscription);
    console.log(`POST /simplytix/subscribe - User ${userId} subscribed to event ${eventId}`);
    res.json({ message: 'Successfully subscribed to event', subscription });
  } else {
    // Remove from subscriptions
    const subscriptionIndex = subscriptions.findIndex(s => s.eventId === eventId && s.userId === userId);
    if (subscriptionIndex !== -1) {
      subscriptions.splice(subscriptionIndex, 1);
    }
    console.log(`POST /simplytix/subscribe - User ${userId} unsubscribed from event ${eventId}`);
    res.json({ message: 'Successfully unsubscribed from event' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`SimplyTix API Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /simplytix/Event          - Get all events');
  console.log('  GET    /simplytix/Event/:id      - Get specific event');
  console.log('  POST   /simplytix/Event          - Create new event');
  console.log('  PUT    /simplytix/Event/:id      - Update event');
  console.log('  DELETE /simplytix/Event/:id      - Delete event');
  console.log('  POST   /simplytix/subscribe      - Subscribe to event');
});

export default app;

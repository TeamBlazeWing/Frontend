import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../../comps/Navbar';
import Footer from '../../comps/Footer';

import BannerImage from '../../comps/BannerImage';
import PlanInfoPanel from '../../comps/PlanInfoPanel';
import MyEventsHeader from '../../comps/MyEventsHeader';
import SubscribedEventCard from '../../comps/SubscribedEventCard';
import NoCreatedEvents from '../../comps/NoCreatedEvents';

// Example subscribed event data
const subscribedEvents = [
  {
    id: 1,
    title: 'Art Exhibition',
    image: '/images/art.jpg',
    price: '$10',
    location: 'Art Gallery',
    volunteer: 'Jane Smith'
  },
  {
    id: 2,
    title: 'Basketball Finals',
    image: '/images/basketball.jpg',
    price: '$20',
    location: 'Arena Dome',
    volunteer: 'Alex Brown'
  },
  {
    id: 3,
    title: 'Jazz Evening',
    image: '/images/jazz.jpg',
    price: '$15',
    location: 'Luxe Bar',
    volunteer: 'John Doe'
  }
];

const Events = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreatedEvents = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    const userId = payload.id;

    const res = await axios.get(`http://localhost:3000/api/events/user/${userId}`);
    setCreatedEvents(res.data.events || []);
  } catch (err) {
    console.error('Failed to fetch created events', err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCreatedEvents();
}, []);


  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 p-4 md:p-8">
        <BannerImage />
        <div className="mt-6 space-y-10">
          <PlanInfoPanel />
          <MyEventsHeader onEventCreated={() => fetchCreatedEvents()} />


          {/* Created Events Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Created Events</h2>

            {loading ? (
              <p className="text-gray-400">Loading created events...</p>
            ) : createdEvents.length === 0 ? (
              <NoCreatedEvents />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {createdEvents.map(event => (
                  <SubscribedEventCard
                    key={event._id}
                    event={{
                      title: event.title,
                      image: event.imageUrl,
                      price: event.isFree ? 'Free' : `$${event.price}`,
                      location: event.category,
                      volunteer: event.createdBy?.name || 'Unknown'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Subscribed Events Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Subscribed Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {subscribedEvents.map(event => (
                <SubscribedEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;

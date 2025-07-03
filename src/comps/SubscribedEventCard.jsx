const SubscribedEventCard = ({ event }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-64 hover:scale-105 transition transform duration-300">
      <img
        src={event.image}
        alt={event.title}
        className="rounded-md mb-3 h-36 w-full object-cover"
      />
      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
      <p className="text-sm mb-1">Price: {event.price}</p>
      <p className="text-sm mb-1">Category: {event.location}</p>
      <p className="text-sm mb-3">Created By: {event.volunteer}</p>
      <span className="bg-purple-700 text-white px-2 py-1 rounded text-xs">Created</span>
    </div>
  );
};

export default SubscribedEventCard;

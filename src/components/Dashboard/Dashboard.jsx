import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Example images (replace with your own URLs or import images)
const sliderImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
];

// Example events (replace with your own data)
const events = [
  {
    title: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    date: "2024-06-10T19:00:00Z",
    location: "City Hall",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: 20,
    district: "Downtown",
    type: "Music",
    volunteer: "John Doe"
  },
  {
    title: "Art Exhibition",
    description: "Explore the latest in modern art.",
    date: "2024-07-01T17:00:00Z",
    location: "Art Gallery",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: 10,
    district: "Uptown",
    type: "Art",
    volunteer: "Jane Smith"
  },{
    title: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    date: "2024-06-10T19:00:00Z",
    location: "City Hall",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: 20,
    district: "Downtown",
    type: "Music",
    volunteer: "John Doe"
  },{
    title: "Tech Conference",
    description: "Latest technology trends and innovations.",
    date: "2024-08-15T09:00:00Z",
    location: "Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    price: 50,
    district: "Business District",
    type: "Technology",
    volunteer: "Mike Johnson"
  },{
    title: "Food Festival",
    description: "Taste amazing local and international cuisines.",
    date: "2024-09-10T12:00:00Z",
    location: "Central Park",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: 15,
    district: "Downtown",
    type: "Food",
    volunteer: "Sarah Wilson"
  },{
    title: "Sports Tournament",
    description: "Exciting sports competitions and matches.",
    date: "2024-10-05T14:00:00Z",
    location: "Sports Complex",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: 25,
    district: "Sports District",
    type: "Sports",
    volunteer: "Alex Brown"
  },{
    title: "Comedy Show",
    description: "Laugh out loud with amazing comedians.",
    date: "2024-11-20T20:00:00Z",
    location: "Comedy Club",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    price: 30,
    district: "Entertainment District",
    type: "Comedy",
    volunteer: "Emily Davis"
  }
];

const Navbar = ({ username, onLogout }) => (
  <nav className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
    <span className="text-lg font-semibold text-gray-900 dark:text-white">
      SimplyTix
    </span>
    <div className="flex items-center gap-4">
      <span className="text-gray-700 dark:text-gray-200">Hello, {username}</span>
      <button
        onClick={onLogout}
        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Logout
      </button>
    </div>
  </nav>
);

const ImageSlider = ({ images, interval = 10000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="w-full flex justify-center mb-8 relative">
      {/* Overlay layer */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-3xl font-bold text-white drop-shadow-lg">
          Hi $User Welcome to SimplyTix
        </span>
      </div>
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="rounded-lg shadow-lg object-cover h-50 w-full max-w-none transition-all duration-700"
        style={{ width: "100vw", maxWidth: "100%" }}
      />
    </div>
  );
};

// Search Filter Component
const SearchFilter = ({ onFilterChange, filters }) => {
  const districts = ["All", "Downtown", "Uptown", "Business District", "Sports District", "Entertainment District"];
  const types = ["All", "Music", "Art", "Technology", "Food", "Sports", "Comedy"];
  const volunteers = ["All", "John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Alex Brown", "Emily Davis"];

  return (
    <div className="w-full max-w-6xl mx-auto mb-8  pb-8 pl-8 pr-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4"></h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* District Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            District
          </label>
          <select
            value={filters.district}
            onChange={(e) => onFilterChange({ ...filters, district: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Event Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Volunteer Filter + Clear Button */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Volunteer
            </label>
            <select
              value={filters.volunteer}
              onChange={(e) => onFilterChange({ ...filters, volunteer: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {volunteers.map((volunteer) => (
                <option key={volunteer} value={volunteer}>
                  {volunteer}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => onFilterChange({ district: "All", type: "All", volunteer: "All" })}
            className="mb-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 self-end"
            style={{ height: "40px" }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

// Event Details Modal
const EventModal = ({ event, onClose }) => {
  if (!event) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-opacity-80 backdrop-blur-sm" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative z-10 text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-gray-700 text-2xl pr-7 pt-3 text-red-500 text-[40px]"
        >
          &times;
        </button>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="mb-2">{event.description}</p>
        <p className="mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p className="mb-1"><strong>Location:</strong> {event.location}</p>
        <p className="mb-1"><strong>Price:</strong> ${event.price}</p>
        <button
          onClick={() => alert("Subscribed!")}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

const EventCards = ({ events, onEventClick }) => (
  <div className="flex flex-wrap justify-center gap-6 mb-8">
    {events.map((event, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-80 flex flex-col items-start cursor-pointer"
        onClick={() => onEventClick(event)}
      >
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {event.title}
        </h2>
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({ district: "All", type: "All", volunteer: "All" });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/dashboard"); // change after implementing the backend
    } else {
      setUsername(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    const matchesDistrict = filters.district === "All" || event.district === filters.district;
    const matchesType = filters.type === "All" || event.type === filters.type;
    const matchesVolunteer = filters.volunteer === "All" || event.volunteer === filters.volunteer;
    
    return matchesDistrict && matchesType && matchesVolunteer;
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar username={username} onLogout={handleLogout} />
      <ImageSlider images={sliderImages} interval={10000} />
      <SearchFilter onFilterChange={handleFilterChange} filters={filters} />
      <EventCards events={filteredEvents} onEventClick={setSelectedEvent} />
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <div className="flex flex-1 items-center justify-center"></div>
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700"></div>
    </section>
  );
};

export default Dashboard;

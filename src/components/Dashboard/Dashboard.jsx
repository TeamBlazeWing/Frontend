import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Example images (replace with your own URLs or import images)
const sliderImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
];

const events = [
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
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
        className="rounded-lg shadow-lg object-cover h-64 w-full max-w-none transition-all duration-700"
        style={{ width: "100vw", maxWidth: "100%" }}
      />
    </div>
  );
};

const EventCards = ({ events }) => (
  <div className="flex flex-wrap justify-center gap-6 mb-8">
    {events.map((event, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-80 flex flex-col items-start"
      >
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {event.name}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{event.description}</p>
        <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Enroll
        </button>
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const [username, setUsername] = useState("");
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

  return (
    <section className="bg-gray-50 dark:bg-gray-900  flex flex-col">
      <Navbar username={username} onLogout={handleLogout} />
      <ImageSlider images={sliderImages} interval={10000} />
      <EventCards events={events} />
      <div className="flex flex-1 items-center justify-center"></div>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        </div>
    </section>
  );
};

export default Dashboard;
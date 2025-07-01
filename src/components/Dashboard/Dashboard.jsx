import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaMessage, FaUser } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";

// Image Slider Images
const sliderImages = [
  "../public/Slider/slider.jpg"
];

// Example events (replace with your own data)
const events = [
  {
    title: "Music Concert",
    description: "Enjoy a night of amazing live music performances.",
    date: "2024-06-10T19:00:00Z",
    location: "City Hall",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80", // concert crowd
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
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // new art gallery
    price: 10,
    district: "Uptown",
    type: "Art",
    volunteer: "Jane Smith"
  },
  {
    title: "Tech Conference",
    description: "Latest technology trends and innovations.",
    date: "2024-08-15T09:00:00Z",
    location: "Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80", // tech conference
    price: 50,
    district: "Business District",
    type: "Technology",
    volunteer: "Mike Johnson"
  },
  {
    title: "Food Festival",
    description: "Taste amazing local and international cuisines.",
    date: "2024-09-10T12:00:00Z",
    location: "Central Park",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", // food festival
    price: 15,
    district: "Downtown",
    type: "Food",
    volunteer: "Sarah Wilson"
  },
  {
    title: "Sports Tournament",
    description: "Exciting sports competitions and matches.",
    date: "2024-10-05T14:00:00Z",
    location: "Sports Complex",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80", // new sports
    price: 25,
    district: "Sports District",
    type: "Sports",
    volunteer: "Alex Brown"
  },
  {
    title: "Comedy Show",
    description: "Laugh out loud with amazing comedians.",
    date: "2024-11-20T20:00:00Z",
    location: "Comedy Club",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // new comedy
    price: 30,
    district: "Entertainment District",
    type: "Comedy",
    volunteer: "Emily Davis"
  },
  {
    title: "Book Fair",
    description: "Discover new books and meet your favorite authors.",
    date: "2024-07-15T10:00:00Z",
    location: "Library Plaza",
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80", // books
    price: 5,
    district: "Uptown",
    type: "Art",
    volunteer: "Jane Smith"
  },
  {
    title: "Startup Pitch Night",
    description: "Watch startups pitch their ideas to investors.",
    date: "2024-08-22T18:00:00Z",
    location: "Innovation Hub",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80", // startup
    price: 0,
    district: "Business District",
    type: "Technology",
    volunteer: "Mike Johnson"
  },
  {
    title: "Wine & Cheese Evening",
    description: "Sample exquisite wines and cheeses from around the world.",
    date: "2024-09-18T19:00:00Z",
    location: "Grand Ballroom",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", // new wine and cheese
    price: 40,
    district: "Downtown",
    type: "Food",
    volunteer: "Sarah Wilson"
  },
  {
    title: "Basketball Finals",
    description: "Cheer for your favorite team in the finals.",
    date: "2024-10-12T16:00:00Z",
    location: "Arena",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80", // basketball
    price: 35,
    district: "Sports District",
    type: "Sports",
    volunteer: "Alex Brown"
  },
  {
    title: "Stand-up Night",
    description: "A night of hilarious stand-up comedy.",
    date: "2024-11-25T21:00:00Z",
    location: "Laugh House",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // stand-up
    price: 18,
    district: "Entertainment District",
    type: "Comedy",
    volunteer: "Emily Davis"
  },
  {
    title: "Jazz Evening",
    description: "Smooth jazz performances by renowned artists.",
    date: "2024-06-20T20:00:00Z",
    location: "Jazz Bar",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80", // jazz
    price: 22,
    district: "Downtown",
    type: "Music",
    volunteer: "John Doe"
  },
  {
    title: "Photography Workshop",
    description: "Learn photography from professionals.",
    date: "2024-07-28T11:00:00Z",
    location: "Studio 5",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // photography
    price: 30,
    district: "Uptown",
    type: "Art",
    volunteer: "Jane Smith"
  }
];

const MenuItems = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Events', path: '/events' },
  { id: 3, title: 'Categories', path: '/categories' },
  { id: 4, title: 'About', path: '/about' },
  { id: 5, title: 'Contact', path: '/contact' }
];

const Navbar = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full min-w-[400px] bg-black/10 backdrop-blur-lg shadow-md relative z-[1000]">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        {/* Logo + Text */}
          <div className="flex items-center space-x-3 mr-10">
            <img src="/simplytix.svg" alt="SimplyTix Logo" className="w-12 h-12 rounded-full bg-gray-800" />
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              SimplyTix
            </h1>
          </div>

          {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {MenuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className="text-white text-base font-bold hover:text-gray-300 transition-colors border-b-2 border-transparent hover:border-white"
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Icons, User Info and Hamburger */}
        <div className="flex items-center gap-4">
          
          
          {/* Profile Icon with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-white text-xl hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FaUser />
            </button>
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-600 z-[9999]">
                <div className="py-2">
                  <div className="px-4 py-2 text-white border-b border-gray-600">
                    <p className="text-sm font-medium">Signed in as</p>
                    <p className="text-sm text-gray-300">{username}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Add profile navigation here if needed
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="text-white text-xl hover:text-gray-300">
            <FaMessage />
          </button>
          
          {/* Hamburger for Mobile */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white text-2xl hover:text-gray-300 p-2"
            >
              <TiThMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg shadow-md transition-all duration-300 ease-in-out">
          <ul className="flex flex-col items-center gap-4 py-4 bg-white/10 backdrop-blur-lg shadow-md">
            {MenuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className="text-white text-base font-semibold hover:text-gray-300 transition-colors border-b-2 border-transparent hover:border-white"
                >
                  {item.title}
                </a>
              </li>
            ))}
            <li>
              <span className="text-white text-sm">Hello, {username}</span>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="text-red-400 text-sm font-semibold hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

const ImageSlider = ({ images, interval = 10000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="w-full flex justify-center mb-8 relative px-4 md:px-16">
      <div
        className="rounded-lg shadow-2xl overflow-hidden w-full"
        style={{
          width: "100vw",
          maxWidth: "100%",
          border: "2px solid rgba(255, 255, 255, 0)", // semi-transparent border
        }}
      >
        <img
          src={images[current]}
          alt={`slide-${current}`}
          className="object-cover h-50 w-full transition-all duration-700"
          style={{ width: "100vw", maxWidth: "100%" }}
        />
      </div>
    </div>
  );
};

// Search Filter Component
const SearchFilter = ({ onFilterChange, filters }) => {
  const districts = ["All", "Downtown", "Uptown", "Business District", "Sports District", "Entertainment District"];
  const types = ["All", "Music", "Art", "Technology", "Food", "Sports", "Comedy"];
  const volunteers = ["All", "John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Alex Brown", "Emily Davis"];

  // Custom styles for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: '6px 12px',
      borderRadius: '20px',
      color: 'white',
      backgroundColor: 'rgba(198, 199, 202, 0.2)',
      border: '1px solid rgb(0, 0, 0)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.23)',
      '&:hover': {
        borderColor: 'rgb(0, 0, 0)',
      },
      '&:focus': {
        borderColor: 'rgb(0, 0, 0)',
      },
      '&:active': {
        borderColor: 'rgb(0, 0, 0)',
      },
      '&:focus-within': {
        borderColor: 'rgba(0, 0, 0, 0.55)',
      },
      '&:focus-visible': {
        borderColor: 'rgb(0, 0, 0)',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: 'white',
    }),
    input: (base) => ({
      ...base,
      color: 'white',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'white',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'rgb(0, 0, 0)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.23)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? 'rgb(69, 69, 69)' : 'transparent',
      color: 'white',
      '&:active': {
        backgroundColor: 'rgb(0, 0, 0)',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'rgb(69, 69, 69)',
      borderRadius: '20px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'white',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgb(69, 69, 69)',
        color: 'red',
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: 'transparent',
    }),
  };

  // Convert arrays to options format for react-select
  const districtOptions = districts.map(district => ({ value: district, label: district }));
  const typeOptions = types.map(type => ({ value: type, label: type }));
  const volunteerOptions = volunteers.map(volunteer => ({ value: volunteer, label: volunteer }));

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 p-2 pl-8 pr-8 bg-white dark:bg-black rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4"></h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* District Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            District
          </label>
          <Select
            value={districtOptions.find(option => option.value === filters.district)}
            onChange={(selectedOption) => onFilterChange({ ...filters, district: selectedOption.value })}
            options={districtOptions}
            styles={customStyles}
            placeholder="Select District"
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Event Type
          </label>
          <Select
            value={typeOptions.find(option => option.value === filters.type)}
            onChange={(selectedOption) => onFilterChange({ ...filters, type: selectedOption.value })}
            options={typeOptions}
            styles={customStyles}
            placeholder="Select Type"
          />
        </div>

        {/* Volunteer Filter + Clear Button */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Volunteer
            </label>
            <Select
              value={volunteerOptions.find(option => option.value === filters.volunteer)}
              onChange={(selectedOption) => onFilterChange({ ...filters, volunteer: selectedOption.value })}
              options={volunteerOptions}
              styles={customStyles}
              placeholder="Select Volunteer"
            />
          </div>
          <button
            onClick={() => onFilterChange({ district: "All", type: "All", volunteer: "All" })}
            className="mb-1 px-4 py-2 bg-gray-500 hover:bg-red-600 text-white rounded-[20px] transition-colors duration-200 self-end"
            style={{ height: "50px" }}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-opacity-80 backdrop-blur-sm " />
      <div className="bg-white dark:bg-black backdrop-blur-lg shadow-mdflex rounded-lg shadow-lg p-6 w-full max-w-md relative z-10 text-white">
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
  <div className="flex flex-wrap justify-center gap-4 mb-8">
    {events.map((event, idx) => (
      <div
        key={idx}
        className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-[16px] shadow-md p-4 w-56 flex flex-col items-start cursor-pointer border border-white/20 dark:border-gray-700 transition hover:scale-105"
        onClick={() => onEventClick(event)}
        style={{
          boxShadow: "5px 5px 20px 0 rgba(255, 255, 255, 0.25)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "5px 10px 10px 0 rgba(255, 255, 255, 0.1)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "5px 10px 10px 0 rgba(255, 255, 255, 0.1)";
        }}
      >
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-28 object-cover rounded mb-3"
        />
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          {event.title}
        </h2>
        <div className="text-xs text-gray-700 dark:text-gray-300 mb-1">
          <span className="mr-2">Price: ${event.price}</span>
          <span>Location: {event.location}</span>
        </div>
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
    <section className="bg-gray-50 dark:bg-black backdrop-blur-lg shadow-mdflex flex-col">
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

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Messages.css';
import { 
  FaMessage, 
  FaUser, 
  FaPaperPlane, 
  FaMagnifyingGlass, 
  FaEllipsisVertical, 
  FaPhone, 
  FaVideo, 
  FaImage, 
  FaPaperclip, 
  FaRegFaceSmile, 
  FaArrowLeft,
  FaCircle,
  FaCheck,
  FaCheckDouble,
  FaCalendar,
  FaLocationDot,
  FaUsers
} from 'react-icons/fa6';
import { TiThMenu } from "react-icons/ti";

// Menu Items matching Dashboard
const MenuItems = [
  { id: 1, title: 'Home', path: '/dashboard' },
  { id: 2, title: 'Events', path: '/events' },
  { id: 3, title: 'BuyTicket', path: '/buyticket' },
  { id: 4, title: 'About', path: '/about' },
  { id: 5, title: 'Contact', path: '/contact' }
];

// Mock data for subscribed events and volunteers
const mockSubscribedEvents = [
  {
    id: 2,
    title: "Food Drive Distribution",
    volunteer: {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      role: "Event Coordinator",
      isOnline: false,
      lastSeen: "2 hours ago"
    },
    location: "Community Center",
    date: "2025-07-20",
    unreadCount: 0
  },
  {
    id: 3,
    title: "Beach Cleanup Day",
    volunteer: {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      role: "Environmental Lead",
      isOnline: true,
      lastSeen: null
    },
    location: "Sunset Beach",
    date: "2025-07-25",
    unreadCount: 1
  }
];

// Mock messages data
const mockMessages = {
  1: [
    {
      id: 1,
      senderId: 1,
      senderName: "Sarah Johnson",
      message: "Hi! Thanks for signing up for the Community Garden Cleanup. We're excited to have you join us!",
      timestamp: "2025-07-02T10:30:00Z",
      isRead: true,
      type: "text"
    },
    {
      id: 2,
      senderId: "user",
      senderName: "You",
      message: "Thank you! I'm looking forward to it. What should I bring?",
      timestamp: "2025-07-02T10:35:00Z",
      isRead: true,
      type: "text"
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Sarah Johnson",
      message: "Please bring gardening gloves, a water bottle, and wear comfortable clothes. We'll provide all the tools!",
      timestamp: "2025-07-02T10:40:00Z",
      isRead: false,
      type: "text"
    },
    {
      id: 4,
      senderId: 1,
      senderName: "Sarah Johnson",
      message: "Also, we'll meet at the main entrance at 9 AM sharp. Looking forward to seeing you there! 🌱",
      timestamp: "2025-07-02T10:42:00Z",
      isRead: false,
      type: "text"
    }
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      senderName: "Mike Chen",
      message: "Welcome to the Food Drive Distribution team! We appreciate your support.",
      timestamp: "2025-07-01T14:20:00Z",
      isRead: true,
      type: "text"
    },
    {
      id: 2,
      senderId: "user",
      senderName: "You",
      message: "Happy to help! What time should I arrive?",
      timestamp: "2025-07-01T14:25:00Z",
      isRead: true,
      type: "text"
    }
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      senderName: "Emma Wilson",
      message: "Hey there! Excited to have you join our beach cleanup initiative. Together we can make a difference! 🌊",
      timestamp: "2025-07-02T09:15:00Z",
      isRead: false,
      type: "text"
    }
  ]
};

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Get user info and logout handler
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const username = loggedInUser.name || "User";
  
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/messages");
    }
  }, [navigate]);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      senderId: "user",
      senderName: "You",
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
      type: "text"
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
    }));

    setNewMessage('');
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate volunteer response after 2-3 seconds
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "Thanks for your message! I'll get back to you soon.",
        "Great question! Let me check on that for you.",
        "I appreciate your enthusiasm! See you at the event.",
        "That sounds perfect! Looking forward to working with you.",
        "I'll make sure to have everything ready for your arrival.",
        "Don't hesitate to reach out if you have any other questions!",
        "Your participation means a lot to our community.",
        "We're lucky to have volunteers like you!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const volunteerResponse = {
        id: Date.now() + 1,
        senderId: selectedChat.volunteer.id,
        senderName: selectedChat.volunteer.name,
        message: randomResponse,
        timestamp: new Date().toISOString(),
        isRead: false,
        type: "text"
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), volunteerResponse]
      }));
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredEvents = mockSubscribedEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.volunteer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigation Bar Component - Exact copy from Dashboard
  const Navbar = ({ username, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

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

            <button className="text-white text-xl hover:text-gray-300"onClick={() => {
              navigate('/messages');
              }}>
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

  const ChatList = () => (
    <div className="w-full md:w-80 lg:w-96 flex-shrink-0 bg-gray-800 dark:bg-black border-r border-gray-700 dark:border-gray-800 flex flex-col h-full max-w-md">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 dark:border-gray-800 bg-black dark:bg-black flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl lg:text-2xl font-bold text-white flex items-center">
            <div className="p-2 bg-blue-500 rounded-lg mr-3 flex-shrink-0">
              <FaMessage className="text-white text-sm lg:text-base" />
            </div>
            <span className="truncate">Messages</span>
          </h1>
          <div className="bg-gray-600 dark:bg-gray-700 px-2 lg:px-3 py-1 rounded-full shadow-sm flex-shrink-0">
            <span className="text-xs lg:text-sm font-medium text-white">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'chat' : 'chats'}
            </span>
          </div>
        </div>
        
        {/* Enhanced Search */}
        <div className="relative group">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors text-sm" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 lg:py-3 bg-gray-600 dark:bg-gray-700 border border-gray-500 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 shadow-sm transition-all duration-200 text-sm lg:text-base"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredEvents.length === 0 ? (
          <div className="p-4 lg:p-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              <FaMessage className="relative mx-auto text-4xl lg:text-6xl text-gray-400 dark:text-gray-500 mb-4" />
            </div>
            <h3 className="text-base lg:text-lg font-semibold text-white mb-2">
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </h3>
            <p className="text-xs lg:text-sm text-gray-400 dark:text-gray-500 max-w-sm mx-auto px-2">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Subscribe to events to start chatting with volunteers and coordinators'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700 dark:divide-gray-800">
            {filteredEvents.map((event, index) => {
              const lastMessage = messages[event.id]?.slice(-1)[0];
              const unreadCount = messages[event.id]?.filter(msg => !msg.isRead && msg.senderId !== "user").length || 0;
              
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedChat(event)}
                  className={`p-3 lg:p-4 cursor-pointer transition-all duration-200 hover:shadow-md relative group ${
                    selectedChat?.id === event.id
                      ? 'bg-gray-700 dark:bg-gray-800 border-r-4 border-blue-500'
                      : 'hover:bg-gray-700 dark:hover:bg-gray-800'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                >
                  <div className="flex items-start space-x-3">
                    {/* Enhanced Avatar with online indicator */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={event.volunteer.avatar}
                        alt={event.volunteer.name}
                        className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-gray-600 dark:ring-gray-700 shadow-md"
                      />
                      {event.volunteer.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-5 lg:h-5 bg-green-500 rounded-full border-2 lg:border-3 border-white shadow-sm animate-pulse"></div>
                      )}
                      {unreadCount > 0 && (
                        <div className="absolute -top-1 -left-1 w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-white truncate pr-2">
                          {event.volunteer.name}
                        </p>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {lastMessage && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                              {formatTime(lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-1 lg:mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 dark:bg-blue-700 text-blue-100">
                          {event.volunteer.role}
                        </span>
                      </div>
                      
                      <p className="text-xs lg:text-sm font-medium text-white mb-1 truncate">
                        {event.title}
                      </p>
                      
                      {lastMessage ? (
                        <p className="text-xs lg:text-sm text-gray-300 dark:text-gray-400 truncate">
                          {lastMessage.senderId === "user" ? (
                            <span className="font-medium text-blue-400">You: </span>
                          ) : null}
                          {lastMessage.message}
                        </p>
                      ) : (
                        <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-600 italic">
                          Start a conversation...
                        </p>
                      )}
                      
                      <div className="flex items-center mt-1 lg:mt-2 text-xs text-gray-400 dark:text-gray-500">
                        <FaLocationDot className="mr-1 text-red-400 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                        <span className="mx-2 flex-shrink-0">•</span>
                        <FaCalendar className="mr-1 text-green-400 flex-shrink-0" />
                        <span className="flex-shrink-0">{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover effect indicator */}
                  <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-full transition-all duration-200 ${
                    selectedChat?.id === event.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const ChatWindow = () => {
    if (!selectedChat) {
      return (
        <div className="flex-1 flex items-center justify-center bg-black dark:bg-black min-w-0">
          <div className="text-center max-w-sm lg:max-w-md mx-auto p-4 lg:p-8">
            <div className="relative mb-4 lg:mb-6">
              
              <FaMessage className="relative mx-auto text-6xl lg:text-8xl text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3">
              Welcome to Messages
            </h3>
            <p className="text-sm lg:text-base text-gray-300 dark:text-gray-400 leading-relaxed px-4">
              Select a conversation from the left to start chatting with event volunteers.
              Connect, ask questions, and coordinate your volunteer activities!
            </p>
            <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-gray-700 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-600 dark:border-gray-700">
              <p className="text-xs lg:text-sm text-gray-300 dark:text-gray-400">
                💡 <strong>Tip:</strong> Use messages to coordinate meetup times, ask questions about events, and stay connected with your volunteer community.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const chatMessages = messages[selectedChat.id] || [];

    return (
      <div className="flex-1 flex flex-col bg-gray-800 dark:bg-gray-900 h-full min-w-0">
        {/* Enhanced Chat Header */}
        <div className="p-3 lg:p-4 border-b border-gray-700 dark:border-gray-800 bg-gray-700 dark:bg-gray-800 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {isMobileView && (
                <button
                  onClick={() => setSelectedChat(null)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                >
                  <FaArrowLeft />
                </button>
              )}
              
              <div className="relative flex-shrink-0">
                <img
                  src={selectedChat.volunteer.avatar}
                  alt={selectedChat.volunteer.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-blue-500 shadow-md"
                />
                {selectedChat.volunteer.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-white text-base lg:text-lg truncate">
                  {selectedChat.volunteer.name}
                </h2>
                <p className="text-xs lg:text-sm text-gray-300 dark:text-gray-400">
                  {selectedChat.volunteer.isOnline ? (
                    <span className="flex items-center text-green-400">
                      <FaCircle className="w-2 h-2 mr-1 animate-pulse flex-shrink-0" />
                      <span className="truncate">Online now</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaCircle className="w-2 h-2 text-gray-500 mr-1 flex-shrink-0" />
                      <span className="truncate">Last seen {selectedChat.volunteer.lastSeen}</span>
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
              <button className="p-2 lg:p-3 text-gray-300 hover:text-blue-400 rounded-xl hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-200">
                <FaPhone className="h-3 w-3 lg:h-4 lg:w-4" />
              </button>
              <button className="p-2 lg:p-3 text-gray-300 hover:text-blue-400 rounded-xl hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-200">
                <FaVideo className="h-3 w-3 lg:h-4 lg:w-4" />
              </button>
              <button className="p-2 lg:p-3 text-gray-300 hover:text-white rounded-xl hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-200">
                <FaEllipsisVertical className="h-3 w-3 lg:h-4 lg:w-4" />
              </button>
            </div>
          </div>
          
          {/* Enhanced Event Info */}
          <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-blue-600 dark:bg-blue-700 rounded-xl border border-blue-500 dark:border-blue-600">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-blue-500 rounded-lg mr-3 flex-shrink-0">
                    <FaUsers className="text-white h-3 w-3 lg:h-4 lg:w-4" />
                  </div>
                  <p className="font-bold text-blue-100 text-base lg:text-lg truncate">
                    {selectedChat.title}
                  </p>
                </div>
                <div className="flex items-center text-xs lg:text-sm text-blue-200 space-x-2 lg:space-x-4">
                  <div className="flex items-center min-w-0">
                    <FaLocationDot className="mr-1 text-red-400 flex-shrink-0" />
                    <span className="truncate">{selectedChat.location}</span>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <FaCalendar className="mr-1 text-green-400" />
                    <span>{new Date(selectedChat.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4 bg-gray-900 dark:bg-black min-h-0">
          {chatMessages.length === 0 ? (
            <div className="text-center py-8 lg:py-12">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <FaMessage className="relative text-3xl lg:text-4xl text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-white mt-3 lg:mt-4 text-base lg:text-lg">
                No messages yet. Start the conversation!
              </p>
              <p className="text-xs lg:text-sm text-gray-400 dark:text-gray-500 mt-2">
                Say hello and introduce yourself to {selectedChat.volunteer.name}
              </p>
            </div>
          ) : (
            <>
              {chatMessages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"} group`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideIn 0.3s ease-out forwards'
                  }}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-3 lg:px-4 py-2 lg:py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                      message.senderId === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white transform hover:scale-105"
                        : "bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 transform hover:scale-105"
                    }`}
                  >
                    <p className="text-xs lg:text-sm leading-relaxed break-words">{message.message}</p>
                    <div
                      className={`flex items-center justify-end mt-1 lg:mt-2 text-xs ${
                        message.senderId === "user"
                          ? "text-blue-100"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      <span className="font-medium">{formatTime(message.timestamp)}</span>
                      {message.senderId === "user" && (
                        <span className="ml-2 flex items-center">
                          {message.isRead ? (
                            <FaCheckDouble className="text-green-300" />
                          ) : (
                            <FaCheck className="text-blue-200" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 dark:bg-gray-800 px-3 lg:px-4 py-2 lg:py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Message Input */}
        <div className="p-3 lg:p-4 border-t border-gray-700 dark:border-gray-800 bg-gray-800 dark:bg-gray-900 flex-shrink-0">
          <div className="flex items-end space-x-2 lg:space-x-3">
            <button className="p-2 lg:p-3 text-gray-300 hover:text-blue-400 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0">
              <FaPaperclip className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
            <button className="p-2 lg:p-3 text-gray-300 hover:text-blue-400 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0">
              <FaImage className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
            
            <div className="flex-1 relative min-w-0">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message ${selectedChat.volunteer.name}...`}
                rows={1}
                className="w-full px-3 lg:px-4 py-2 lg:py-3 pr-10 lg:pr-12 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none transition-all duration-200 shadow-sm focus:shadow-md text-sm lg:text-base"
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
              <button className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 p-1 lg:p-2 text-gray-300 hover:text-blue-400 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-200">
                <FaRegFaceSmile className="h-3 w-3 lg:h-4 lg:w-4" />
              </button>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-2 lg:p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-sm flex-shrink-0 ${
                newMessage.trim()
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200 dark:shadow-blue-800"
                  : "bg-gray-600 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaPaperPlane className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-gray-50 dark:bg-black flex flex-col overflow-hidden">
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        /* Ensure no horizontal scroll */
        body {
          overflow-x: hidden;
        }
      `}</style>
      
      {/* Navigation Bar - Same as Dashboard */}
      <div className="flex-shrink-0">
        <Navbar username={username} onLogout={handleLogout} />
      </div>
      
      {/* Main Messages Container */}
      <main className="flex-1 flex overflow-hidden min-h-0">
        {/* Mobile: Show either chat list or chat window */}
        {isMobileView ? (
          selectedChat ? <ChatWindow /> : <ChatList />
        ) : (
          /* Desktop: Show both side by side */
          <>
            <ChatList />
            <ChatWindow />
          </>
        )}
      </main>
    </div>
  );
}

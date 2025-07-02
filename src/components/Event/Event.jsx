import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaMessage, FaUser, FaPlus, FaPenToSquare, FaTrash, FaEye } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";

// Image Slider Images
const sliderImages = [
  "../public/Slider/slider.jpg"
];

const MenuItems = [
  { id: 1, title: 'Home', path: '/dashboard' },
  { id: 2, title: 'Events', path: '/events' },
  { id: 3, title: 'BuyTicket', path: '/buyticket' },
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
          border: "2px solid rgba(255, 255, 255, 0)",
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

// Subscription Plans Modal
const SubscriptionPlansModal = ({ onClose, onSelectPlan }) => {
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 9.99,
      duration: 'Monthly',
      features: [
        'Create up to 3 events per month',
        'Basic event analytics',
        'Email support',
        'Standard event promotion'
      ],
      color: 'bg-blue-600 hover:bg-blue-700',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 19.99,
      duration: 'Monthly',
      features: [
        'Create up to 10 events per month',
        'Advanced event analytics',
        'Priority email support',
        'Featured event promotion',
        'Custom event branding'
      ],
      color: 'bg-purple-600 hover:bg-purple-700',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 49.99,
      duration: 'Monthly',
      features: [
        'Unlimited event creation',
        'Comprehensive analytics dashboard',
        '24/7 phone & email support',
        'Premium event promotion',
        'Full custom branding',
        'API access',
        'Dedicated account manager'
      ],
      color: 'bg-yellow-600 hover:bg-yellow-700',
      popular: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black/90 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto text-white border border-gray-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Choose Your Subscription Plan</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-400 text-3xl"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-800/50 rounded-lg p-6 border-2 transition-all hover:scale-105 ${
                plan.popular ? 'border-purple-500' : 'border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-1">${plan.price}</div>
                <div className="text-gray-400">{plan.duration}</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.color} text-white`}
              >
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>All plans include secure payment processing and can be cancelled anytime.</p>
          <p>30-day money-back guarantee on all subscriptions.</p>
        </div>
      </div>
    </div>
  );
};

// Payment Modal
const PaymentModal = ({ plan, onClose, onPaymentSuccess }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(plan);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black/90 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto text-white border border-gray-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-red-500 hover:text-red-400 text-3xl disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Plan Summary */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-600">
          <h3 className="font-semibold mb-2">{plan.name}</h3>
          <div className="flex justify-between items-center">
            <span>Monthly Subscription</span>
            <span className="text-2xl font-bold">${plan.price}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Information */}
          <div>
            <label className="block text-sm font-medium mb-2">Card Number</label>
            <input
              type="text"
              required
              maxLength="19"
              value={paymentData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              disabled={isProcessing}
              placeholder="1234 5678 9012 3456"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date</label>
              <input
                type="text"
                required
                maxLength="5"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                disabled={isProcessing}
                placeholder="MM/YY"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input
                type="text"
                required
                maxLength="4"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/[^0-9]/g, ''))}
                disabled={isProcessing}
                placeholder="123"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cardholder Name</label>
            <input
              type="text"
              required
              value={paymentData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              disabled={isProcessing}
              placeholder="John Doe"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
            />
          </div>

          {/* Billing Address */}
          <div>
            <label className="block text-sm font-medium mb-2">Billing Address</label>
            <input
              type="text"
              required
              value={paymentData.billingAddress}
              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
              disabled={isProcessing}
              placeholder="123 Main Street"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                required
                value={paymentData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                disabled={isProcessing}
                placeholder="New York"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code</label>
              <input
                type="text"
                required
                value={paymentData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                disabled={isProcessing}
                placeholder="10001"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              `Pay $${plan.price} Now`
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-400 text-xs">
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

// Subscription Status Component
const SubscriptionStatus = ({ userSubscription, onUpgrade }) => {
  if (!userSubscription) {
    return (
      <div className="w-full max-w-6xl mx-auto mb-8 p-4 bg-yellow-600/20 border border-yellow-500 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-yellow-400 font-semibold">No Active Subscription</h3>
            <p className="text-gray-300 text-sm">Subscribe to a plan to create and manage events</p>
          </div>
          <button
            onClick={onUpgrade}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
          >
            View Plans
          </button>
        </div>
      </div>
    );
  }

  const expiryDate = new Date(userSubscription.expiryDate);
  const now = new Date();
  const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
  
  return (
    <div className={`w-full max-w-6xl mx-auto mb-8 p-4 rounded-lg border ${
      daysLeft <= 7 
        ? 'bg-yellow-600/20 border-yellow-500' 
        : 'bg-green-600/20 border-green-500'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-semibold ${daysLeft <= 7 ? 'text-yellow-400' : 'text-green-400'}`}>
            {userSubscription.plan} - Active
          </h3>
          <p className="text-gray-300 text-sm">
            {daysLeft > 0 
              ? `${daysLeft} days remaining` 
              : 'Expires today'
            }
          </p>
        </div>
        <button
          onClick={onUpgrade}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

// Event Management Controls
const EventControls = ({ onCreateEvent, createdEventsCount, subscribedEventsCount, userSubscription }) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8 p-4 bg-white/10 dark:bg-black/30 backdrop-blur-lg rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h2 className="text-white text-xl font-semibold">
              My Events
            </h2>
            <div className="flex gap-4 text-sm">
              <span className="text-blue-300">
                Created: {createdEventsCount}
              </span>
              <span className="text-green-300">
                Subscribed: {subscribedEventsCount}
              </span>
            </div>
          </div>
          {userSubscription && (
            <span className="ml-4 px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
              {userSubscription.plan} Plan
            </span>
          )}
        </div>
        <button
          onClick={onCreateEvent}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          <FaPlus className="inline mr-2" />
          Create Event
        </button>
      </div>
    </div>
  );
};

// Search Filter Component - Remove this since we only show My Events
const SearchFilter = () => {
  return null; // No filters needed for My Events only
};

// Create/Edit Event Modal
const EventFormModal = ({ event, onClose, onSave, isLoading, userSubscription, username }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date ? new Date(event.date).toISOString().slice(0, 16) : '',
    location: event?.location || '',
    imageUrl: event?.imageUrl || '',
    price: event?.price || 0,
    district: event?.district || 'Downtown',
    type: event?.type || 'Music',
    volunteer: event?.volunteer || username || 'John Doe'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      date: new Date(formData.date).toISOString()
    });
  };

  const getSubscriptionInfo = () => {
    if (!userSubscription) return null;
    
    const limits = {
      'Basic Plan': 3,
      'Premium Plan': 10,
      'Enterprise Plan': 'Unlimited'
    };
    
    return limits[userSubscription.plan] || 'Unknown';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black/90 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white border border-gray-600">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{event ? 'Edit Event' : 'Create New Event'}</h2>
            {userSubscription && (
              <p className="text-sm text-gray-400 mt-1">
                {userSubscription.plan} - Monthly limit: {getSubscriptionInfo()}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-red-500 hover:text-red-400 text-3xl disabled:opacity-50"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                disabled={isLoading}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                disabled={isLoading}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              disabled={isLoading}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date & Time</label>
              <input
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                disabled={isLoading}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                disabled={isLoading}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              disabled={isLoading}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">District</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                disabled={isLoading}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              >
                <option value="Downtown">Downtown</option>
                <option value="Uptown">Uptown</option>
                <option value="Business District">Business District</option>
                <option value="Sports District">Sports District</option>
                <option value="Entertainment District">Entertainment District</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                disabled={isLoading}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
              >
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Technology">Technology</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Volunteer</label>
              <input
                type="text"
                value={formData.volunteer}
                onChange={(e) => setFormData({...formData, volunteer: e.target.value})}
                disabled={!event && isLoading} // Auto-set for new events, editable for existing ones
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white disabled:opacity-50"
                placeholder="Event volunteer"
              />
              {!event && (
                <p className="text-xs text-gray-400 mt-1">
                  Your username is automatically set as the volunteer for new events
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {event ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                event ? 'Update Event' : 'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Event Details Modal
const EventModal = ({ event, onClose, onEdit, onDelete, onSubscribe, subscribing, operationLoading }) => {
  const navigate = useNavigate();
  
  if (!event) return null;

  const handleBuyTicket = () => {
    // Store the selected event in localStorage for the buy ticket page
    localStorage.setItem('selectedEvent', JSON.stringify(event));
    navigate('/buyticket');
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black/90 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-md relative text-white border border-gray-600">
        <button
          onClick={onClose}
          disabled={operationLoading}
          className="absolute top-2 right-2 hover:text-gray-400 text-2xl pr-7 pt-3 text-red-500 text-[40px] disabled:opacity-50"
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
        <p className="mb-1"><strong>District:</strong> {event.district}</p>
        <p className="mb-1"><strong>Type:</strong> {event.type}</p>
        <p className="mb-4"><strong>Volunteer:</strong> {event.volunteer}</p>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onSubscribe(event.id)}
            disabled={subscribing || operationLoading}
            className={`flex-1 font-semibold py-2 px-4 rounded-lg transition ${
              event.isSubscribed 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            } ${(subscribing || operationLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {subscribing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {event.isSubscribed ? 'Unsubscribing...' : 'Subscribing...'}
              </div>
            ) : (
              event.isSubscribed ? 'Unsubscribe' : 'Subscribe'
            )}
          </button>
          
          <button
            onClick={handleBuyTicket}
            disabled={operationLoading}
            className={`flex-1 font-semibold py-2 px-4 rounded-lg transition bg-purple-600 hover:bg-purple-700 text-white ${
              operationLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Buy Ticket
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            disabled={operationLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 text-white rounded-lg transition"
          >
            <FaPenToSquare />
          </button>
          
          <button
            onClick={() => onDelete(event.id)}
            disabled={operationLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-500 text-white rounded-lg transition flex items-center justify-center"
          >
            {operationLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <FaTrash />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const EventCards = ({ events, onEventClick, username, sectionTitle, emptyMessage }) => {
  if (events.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto mb-8">
        <h3 className="text-white text-lg font-semibold mb-4">{sectionTitle}</h3>
        <div className="flex justify-center items-center py-8">
          <div className="text-center text-white">
            <h4 className="text-lg font-medium mb-2">
              No Events Found
            </h4>
            <p className="text-gray-300 text-sm">
              {emptyMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <h3 className="text-white text-lg font-semibold mb-4">{sectionTitle}</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-[16px] shadow-md p-4 w-56 flex flex-col items-start cursor-pointer border border-white/20 dark:border-gray-700 transition hover:scale-105 relative"
            onClick={() => onEventClick(event)}
            style={{
              boxShadow: "5px 5px 20px 0 rgba(255, 255, 255, 0.25)",
            }}
          >
            {/* Event status badges */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {event.volunteer === username && (
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  ✏️ Created
                </div>
              )}
              {event.isSubscribed && (
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  ✓ Subscribed
                </div>
              )}
            </div>
            
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
            
            <div className="text-xs text-gray-700 dark:text-gray-300">
              <span className="mr-2">Volunteer: {event.volunteer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white-400">SimplyTix</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting communities through meaningful events and volunteer opportunities. 
              Join us in making a difference in your local area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.169 1.219-5.169s-.311-.623-.311-1.544c0-1.447.839-2.527 1.883-2.527.888 0 1.319.664 1.319 1.46 0 .888-.565 2.219-.857 3.449-.244 1.029.516 1.868 1.529 1.868 1.836 0 3.247-1.936 3.247-4.728 0-2.473-1.776-4.2-4.315-4.2-2.94 0-4.668 2.205-4.668 4.485 0 .887.341 1.838.766 2.357.084.099.096.188.071.29-.077.321-.248 1.011-.282 1.152-.043.182-.141.221-.326.133-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.155l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Volunteer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                123 Event Street, City, State 12345
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (555) 123-4567
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@SimplyTix.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 SimplyTix. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Event = () => {
  const [username, setUsername] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);
  const navigate = useNavigate();

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/simplytix/Event');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events from API. Falling back to local data.");
        
        // Fallback to local JSON file if API fails
        try {
          const fallbackResponse = await fetch('/events.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setEvents(fallbackData);
            setError("Using local data (API unavailable)");
          }
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
          setEvents([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/events");
    } else {
      setUsername(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("accessToken");
    navigate("/events");
  };

  const handleCreateEvent = () => {
    // Check if user has a subscription
    const subscription = localStorage.getItem('userSubscription');
    if (!subscription) {
      setShowSubscriptionPlans(true);
      return;
    }
    
    // Parse subscription and check if it's valid
    try {
      const parsedSubscription = JSON.parse(subscription);
      const now = new Date();
      const expiryDate = new Date(parsedSubscription.expiryDate);
      
      if (now > expiryDate) {
        alert('Your subscription has expired. Please renew to create events.');
        setShowSubscriptionPlans(true);
        return;
      }
      
      setUserSubscription(parsedSubscription);
      setIsCreating(true);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error parsing subscription:', error);
      setShowSubscriptionPlans(true);
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowSubscriptionPlans(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (plan) => {
    // Create subscription object
    const subscription = {
      plan: plan.name,
      planId: plan.id,
      price: plan.price,
      startDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      active: true
    };
    
    // Save to localStorage
    localStorage.setItem('userSubscription', JSON.stringify(subscription));
    setUserSubscription(subscription);
    
    // Close modals and show success
    setShowPaymentModal(false);
    setSelectedPlan(null);
    
    // Show success message with more details
    const features = {
      'Basic Plan': 'up to 3 events per month',
      'Premium Plan': 'up to 10 events per month', 
      'Enterprise Plan': 'unlimited events'
    };
    
    alert(`🎉 Payment successful! Welcome to ${plan.name}!\n\nYou can now create ${features[plan.name]} and access all premium features.\n\nYour subscription is active until ${new Date(subscription.expiryDate).toLocaleDateString()}.`);
    
    // Now open the create event modal
    setIsCreating(true);
    setEditingEvent(null);
  };

  const handleUpgradeSubscription = () => {
    setShowSubscriptionPlans(true);
  };
  useEffect(() => {
    const subscription = localStorage.getItem('userSubscription');
    if (subscription) {
      try {
        const parsedSubscription = JSON.parse(subscription);
        const now = new Date();
        const expiryDate = new Date(parsedSubscription.expiryDate);
        
        if (now <= expiryDate) {
          setUserSubscription(parsedSubscription);
        } else {
          // Remove expired subscription
          localStorage.removeItem('userSubscription');
        }
      } catch (error) {
        console.error('Error parsing subscription:', error);
        localStorage.removeItem('userSubscription');
      }
    }
  }, []);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsCreating(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      setOperationLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      if (editingEvent) {
        // Update existing event
        const response = await fetch(`http://localhost:3000/simplytix/Event/${editingEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
          },
          body: JSON.stringify({
            ...eventData,
            id: editingEvent.id,
            isSubscribed: editingEvent.isSubscribed
          })
        });

        if (response.ok) {
          const updatedEvent = await response.json();
          setEvents(events.map(event => 
            event.id === editingEvent.id ? updatedEvent : event
          ));
          alert("Event updated successfully!");
        } else {
          throw new Error('Failed to update event');
        }
      } else {
        // Create new event
        const response = await fetch('http://localhost:3000/simplytix/Event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
          },
          body: JSON.stringify({
            ...eventData,
            isSubscribed: false
          })
        });

        if (response.ok) {
          const newEvent = await response.json();
          setEvents([...events, newEvent]);
          alert("Event created successfully!");
        } else {
          throw new Error('Failed to create event');
        }
      }
      
      setEditingEvent(null);
      setIsCreating(false);
      
    } catch (error) {
      console.error("Error saving event:", error);
      alert(`Failed to ${editingEvent ? 'update' : 'create'} event: ${error.message}`);
      
      // Fallback: Update local state for demo purposes
      if (editingEvent) {
        setEvents(events.map(event => 
          event.id === editingEvent.id ? { ...eventData, id: editingEvent.id, isSubscribed: editingEvent.isSubscribed } : event
        ));
      } else {
        setEvents([...events, { ...eventData, id: Date.now(), isSubscribed: false }]);
      }
      setEditingEvent(null);
      setIsCreating(false);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      setOperationLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      const response = await fetch(`http://localhost:3000/simplytix/Event/${eventId}`, {
        method: 'DELETE',
        headers: {
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        }
      });

      if (response.ok) {
        setEvents(events.filter(event => event.id !== eventId));
        setSelectedEvent(null);
        alert("Event deleted successfully!");
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(`Failed to delete event: ${error.message}`);
      
      // Fallback: Update local state for demo purposes
      setEvents(events.filter(event => event.id !== eventId));
      setSelectedEvent(null);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleSubscribe = async (eventId) => {
    try {
      setSubscribing(true);
      
      // Find the current event
      const currentEvent = events.find(event => event.id === eventId);
      if (!currentEvent) return;
      
      // Make API call to subscribe/unsubscribe
      const response = await fetch('http://localhost:3000/simplytix/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          isSubscribed: !currentEvent.isSubscribed,
          userId: localStorage.getItem("loggedInUser") || username
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state immediately for better UX
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, isSubscribed: !event.isSubscribed }
          : event
      ));
      
      // Update selected event if it's currently open
      if (selectedEvent && selectedEvent.id === eventId) {
        setSelectedEvent({ ...selectedEvent, isSubscribed: !selectedEvent.isSubscribed });
      }

      console.log(`${currentEvent.isSubscribed ? 'Unsubscribed from' : 'Subscribed to'} event: ${currentEvent.title}`);
      
    } catch (error) {
      console.error('Error updating subscription:', error);
      
      // Show error message but still update local state for demo purposes
      alert(`Subscription API call failed: ${error.message}\n\nNote: The local state has been updated for demo purposes, but in a real app, this would require a working backend.`);
      
      // Update local state anyway for demo purposes
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, isSubscribed: !event.isSubscribed }
          : event
      ));
      
      if (selectedEvent && selectedEvent.id === eventId) {
        setSelectedEvent({ ...selectedEvent, isSubscribed: !selectedEvent.isSubscribed });
      }
    } finally {
      setSubscribing(false);
    }
  };

  // Show both events created by user (as volunteer) and events user subscribed to
  const createdEvents = events.filter(event => event.volunteer === username);
  const subscribedEvents = events.filter(event => event.isSubscribed && event.volunteer !== username);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      <Navbar username={username} onLogout={handleLogout} />
      <main className="flex-1">
        <ImageSlider images={sliderImages} interval={10000} />
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-white text-lg">Loading events...</span>
          </div>
        )}
        
        {error && (
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <SubscriptionStatus 
              userSubscription={userSubscription}
              onUpgrade={handleUpgradeSubscription}
            />
            <EventControls 
              onCreateEvent={handleCreateEvent}
              createdEventsCount={createdEvents.length}
              subscribedEventsCount={subscribedEvents.length}
              userSubscription={userSubscription}
            />
            <SearchFilter />
            
            {/* Created Events Section */}
            <div className="w-full max-w-6xl mx-auto mb-8">
              <div className="flex items-center mb-4">
                <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-l-full font-bold shadow-lg text-lg">
                  <FaPenToSquare className="inline mr-2" />
                  Created Events
                </span>
                <div className="flex-1 border-t-2 border-purple-400"></div>
              </div>
              <EventCards 
                events={createdEvents} 
                onEventClick={setSelectedEvent}
                username={username}
                sectionTitle=""
                emptyMessage="You haven't created any events yet. Click 'Create Event' to get started!"
              />
            </div>

            {/* Subscribed Events Section */}
            <div className="w-full max-w-6xl mx-auto mb-8">
              <div className="flex items-center mb-4">
                <span className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-l-full font-bold shadow-lg text-lg">
                  <FaEye className="inline mr-2" />
                  Subscribed Events
                </span>
                <div className="flex-1 border-t-2 border-green-400"></div>
              </div>
              <EventCards 
                events={subscribedEvents} 
                onEventClick={setSelectedEvent}
                username={username}
                sectionTitle=""
                emptyMessage="You haven't subscribed to any events yet. Browse and subscribe to events you're interested in!"
              />
            </div>
          </>
        )}
        
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onSubscribe={handleSubscribe}
          subscribing={subscribing}
          operationLoading={operationLoading}
        />
        
        {/* Create/Edit Event Modal */}
        {(isCreating || editingEvent) && (
          <EventFormModal
            event={editingEvent}
            onClose={() => {
              setIsCreating(false);
              setEditingEvent(null);
            }}
            onSave={handleSaveEvent}
            isLoading={operationLoading}
            userSubscription={userSubscription}
            username={username}
          />
        )}

        {/* Subscription Plans Modal */}
        {showSubscriptionPlans && (
          <SubscriptionPlansModal
            onClose={() => setShowSubscriptionPlans(false)}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedPlan(null);
            }}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Event;

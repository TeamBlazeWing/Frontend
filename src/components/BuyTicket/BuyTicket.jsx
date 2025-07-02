import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMessage, FaUser, FaArrowLeft, FaCreditCard, FaPaypal } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";

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

const BuyTicket = () => {
  const [username, setUsername] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/buyticket");
    } else {
      setUsername(loggedInUser);
    }

    // Get selected event from localStorage
    const eventData = localStorage.getItem('selectedEvent');
    if (eventData) {
      setSelectedEvent(JSON.parse(eventData));
    } else {
      // If no event selected, redirect to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("selectedEvent");
    navigate("/buyticket");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call for ticket purchase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear selected event from localStorage
      localStorage.removeItem('selectedEvent');
      
      alert(`Successfully purchased ${quantity} ticket(s) for ${selectedEvent.title}! A confirmation email will be sent to ${formData.email}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("Failed to purchase ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = selectedEvent ? selectedEvent.price * quantity : 0;

  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">No Event Selected</h2>
          <p className="mb-4">Please select an event to purchase tickets.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      <Navbar username={username} onLogout={handleLogout} />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Event Details */}
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{selectedEvent.title}</h3>
              <p className="text-gray-300 mb-4">{selectedEvent.description}</p>
              <div className="space-y-2">
                <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
                <p><strong>Location:</strong> {selectedEvent.location}</p>
                <p><strong>District:</strong> {selectedEvent.district}</p>
                <p><strong>Type:</strong> {selectedEvent.type}</p>
                <p><strong>Price:</strong> <span className="text-green-400 font-bold">${selectedEvent.price}</span></p>
              </div>
            </div>

            {/* Purchase Form */}
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Purchase Tickets</h2>
              
              <form onSubmit={handlePurchase} className="space-y-4">
                {/* Quantity Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Tickets</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <FaCreditCard className="mr-2" />
                      Credit Card
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <FaPaypal className="mr-2" />
                      PayPal
                    </label>
                  </div>
                </div>

                {/* Payment Details */}
                {paymentMethod === 'credit' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">Billing Address</label>
                  <textarea
                    name="billingAddress"
                    required
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
                    placeholder="Enter your billing address"
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span>Tickets ({quantity}x)</span>
                    <span>${selectedEvent.price * quantity}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-400">${totalPrice + 2.99}</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Purchase ${quantity} Ticket${quantity > 1 ? 's' : ''} - $${totalPrice + 2.99}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyTicket;

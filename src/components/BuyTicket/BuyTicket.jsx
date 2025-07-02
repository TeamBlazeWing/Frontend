import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMessage, FaUser, FaArrowLeft, FaCreditCard, FaPaypal, FaLock, FaCheck, FaTriangleExclamation, FaCircleInfo, FaCircleCheck, FaShield } from "react-icons/fa6";
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

const BuyTicket = () => {
  const [username, setUsername] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    cardholderName: '',
    saveCard: false,
    acceptTerms: false,
    agreeRefund: false
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
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Real-time validation
    validateField(name, newValue);
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = formatExpiryDate(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    
    // Format phone number
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
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

  const formatPhoneNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (matches) {
      return `(${matches[1]}) ${matches[2]}-${matches[3]}`;
    }
    return v;
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };
    
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'cardNumber':
        const cardRegex = /^[0-9\s]{13,19}$/;
        if (!cardRegex.test(value.replace(/\s/g, ''))) {
          errors.cardNumber = 'Please enter a valid card number';
        } else {
          delete errors.cardNumber;
        }
        break;
      case 'cvv':
        const cvvRegex = /^[0-9]{3,4}$/;
        if (!cvvRegex.test(value)) {
          errors.cvv = 'CVV must be 3-4 digits';
        } else {
          delete errors.cvv;
        }
        break;
      case 'expiryDate':
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryRegex.test(value)) {
          errors.expiryDate = 'Please enter MM/YY format';
        } else {
          // Check if date is not in the past
          const [month, year] = value.split('/');
          const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
          const now = new Date();
          if (expiry < now) {
            errors.expiryDate = 'Card has expired';
          } else {
            delete errors.expiryDate;
          }
        }
        break;
      case 'phone':
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(value) && value.length > 0) {
          errors.phone = 'Please enter a valid phone number';
        } else {
          delete errors.phone;
        }
        break;
      default:
        break;
    }
    
    setFormErrors(errors);
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    if (/^6/.test(cleanNumber)) return 'Discover';
    return 'Unknown';
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'email', 'phone'];
    if (paymentMethod === 'credit') {
      requiredFields.push('cardNumber', 'expiryDate', 'cvv', 'cardholderName', 'billingAddress');
    }
    
    return requiredFields.every(field => formData[field] && formData[field].trim() !== '') &&
           Object.keys(formErrors).length === 0 &&
           formData.acceptTerms &&
           formData.agreeRefund;
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call for ticket purchase
      if (paymentMethod === 'paypal') {
        // Simulate PayPal redirect
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Redirecting to PayPal...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        // Simulate credit card processing
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      // Clear selected event from localStorage
      localStorage.removeItem('selectedEvent');
      
      // Create success message
      const ticketText = quantity === 1 ? 'ticket' : 'tickets';
      const successMessage = `🎉 Purchase Successful!\n\n` +
        `${quantity} ${ticketText} for "${selectedEvent.title}" have been purchased successfully!\n\n` +
        `📧 Confirmation email sent to: ${formData.email}\n` +
        `📱 SMS confirmation sent to: ${formData.phone}\n\n` +
        `Your tickets will be available in your account and sent via email shortly.\n\n` +
        `Total paid: $${totalPrice + 2.99}`;
      
      alert(successMessage);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("❌ Payment Failed\n\nSorry, we couldn't process your payment. Please check your information and try again.\n\nIf the problem persists, please contact our support team.");
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
              {/* Progress Steps */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Purchase Tickets</h2>
                  <div className="flex items-center space-x-2 text-sm">
                    <FaLock className="text-green-400" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`flex items-center ${currentStep >= 1 ? 'text-green-400' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep >= 1 ? 'bg-green-400 text-black' : 'bg-gray-600'}`}>
                      {currentStep > 1 ? <FaCheck /> : '1'}
                    </div>
                    <span className="text-sm">Contact Info</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-600"></div>
                  <div className={`flex items-center ${currentStep >= 2 ? 'text-green-400' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep >= 2 ? 'bg-green-400 text-black' : 'bg-gray-600'}`}>
                      {currentStep > 2 ? <FaCheck /> : '2'}
                    </div>
                    <span className="text-sm">Payment</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-600"></div>
                  <div className={`flex items-center ${currentStep >= 3 ? 'text-green-400' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep >= 3 ? 'bg-green-400 text-black' : 'bg-gray-600'}`}>
                      {currentStep > 3 ? <FaCheck /> : '3'}
                    </div>
                    <span className="text-sm">Review</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handlePurchase} className="space-y-6">
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    
                    {/* Quantity Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Tickets</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} ticket{num > 1 ? 's' : ''} - ${selectedEvent.price * num}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                            formErrors.email ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="Enter your email"
                        />
                        {formErrors.email && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <FaTriangleExclamation className="mr-1" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength="14"
                        className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="(123) 456-7890"
                      />
                      {formErrors.phone && (
                        <p className="text-red-400 text-xs mt-1 flex items-center">
                          <FaTriangleExclamation className="mr-1" />
                          {formErrors.phone}
                        </p>
                      )}
                      {formData.phone && !formErrors.phone && formData.phone.length === 14 && (
                        <p className="text-green-400 text-xs mt-1 flex items-center">
                          <FaCircleCheck className="mr-1" />
                          Valid phone number
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!formData.fullName || !formData.email || !formData.phone || formErrors.email}
                      className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {/* Step 2: Payment Information */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Payment Information</h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        ← Back to Contact Info
                      </button>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Payment Method</label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'credit' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-600 hover:border-gray-500'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-3"
                          />
                          <FaCreditCard className="mr-2 text-xl" />
                          <span>Credit/Debit Card</span>
                        </label>
                        <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-600 hover:border-gray-500'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-3"
                          />
                          <FaPaypal className="mr-2 text-xl text-blue-400" />
                          <span>PayPal</span>
                        </label>
                      </div>
                    </div>

                    {/* Credit Card Form */}
                    {paymentMethod === 'credit' && (
                      <div className="space-y-4">
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <FaCircleInfo className="text-blue-400 mr-2" />
                            <span className="text-sm font-medium">Card Information</span>
                          </div>
                          <p className="text-xs text-gray-300">
                            Your payment information is encrypted and secure. We never store your card details.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardholderName"
                            required
                            value={formData.cardholderName}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Name on card"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number *</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              required
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              maxLength="19"
                              className={`w-full p-3 pl-12 rounded-lg bg-gray-800 border text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                formErrors.cardNumber ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="1234 5678 9012 3456"
                            />
                            <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                            {formData.cardNumber && getCardType(formData.cardNumber) !== 'Unknown' && (
                              <div className="absolute right-3 top-3 text-sm text-green-400 flex items-center">
                                <FaCircleCheck className="mr-1" />
                                {getCardType(formData.cardNumber)}
                              </div>
                            )}
                          </div>
                          {formErrors.cardNumber && (
                            <p className="text-red-400 text-xs mt-1 flex items-center">
                              <FaTriangleExclamation className="mr-1" />
                              {formErrors.cardNumber}
                            </p>
                          )}
                          {formData.cardNumber && !formErrors.cardNumber && formData.cardNumber.length >= 13 && (
                            <p className="text-green-400 text-xs mt-1 flex items-center">
                              <FaCircleCheck className="mr-1" />
                              Valid card number
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                            <input
                              type="text"
                              name="expiryDate"
                              required
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              maxLength="5"
                              className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                formErrors.expiryDate ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="MM/YY"
                            />
                            {formErrors.expiryDate && (
                              <p className="text-red-400 text-xs mt-1 flex items-center">
                                <FaTriangleExclamation className="mr-1" />
                                {formErrors.expiryDate}
                              </p>
                            )}
                            {formData.expiryDate && !formErrors.expiryDate && formData.expiryDate.length === 5 && (
                              <p className="text-green-400 text-xs mt-1 flex items-center">
                                <FaCircleCheck className="mr-1" />
                                Valid expiry date
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVV *</label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cvv"
                                required
                                value={formData.cvv}
                                onChange={handleInputChange}
                                maxLength="4"
                                className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                  formErrors.cvv ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="123"
                              />
                              <div className="absolute right-3 top-3">
                                <FaCircleInfo className="text-gray-400 text-sm" title="3-digit code on back of card (4 digits for Amex)" />
                              </div>
                            </div>
                            {formErrors.cvv && (
                              <p className="text-red-400 text-xs mt-1 flex items-center">
                                <FaTriangleExclamation className="mr-1" />
                                {formErrors.cvv}
                              </p>
                            )}
                            {formData.cvv && !formErrors.cvv && (formData.cvv.length === 3 || formData.cvv.length === 4) && (
                              <p className="text-green-400 text-xs mt-1 flex items-center">
                                <FaCircleCheck className="mr-1" />
                                Valid CVV
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Billing Address *</label>
                          <textarea
                            name="billingAddress"
                            required
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your billing address"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="saveCard"
                            checked={formData.saveCard}
                            onChange={handleInputChange}
                            className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                          />
                          <label className="text-sm text-gray-300">
                            Save card for future purchases (optional)
                          </label>
                        </div>
                      </div>
                    )}

                    {/* PayPal Form */}
                    {paymentMethod === 'paypal' && (
                      <div className="space-y-4">
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 text-center">
                          <FaPaypal className="text-4xl text-blue-400 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold mb-2">PayPal Checkout</h4>
                          <p className="text-sm text-gray-300 mb-4">
                            You will be redirected to PayPal to complete your payment securely.
                          </p>
                          <div className="text-xs text-gray-400 space-y-1">
                            <p>• Pay with your PayPal balance, bank account, or linked cards</p>
                            <p>• No need to enter card details here</p>
                            <p>• Your payment is protected by PayPal's Buyer Protection</p>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <FaCircleInfo className="text-yellow-400 mr-2" />
                            <span className="text-sm font-medium">Important Notice</span>
                          </div>
                          <p className="text-xs text-gray-300">
                            After clicking "Continue to Review", you'll proceed to PayPal's secure checkout where you can log in and confirm your payment.
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      disabled={paymentMethod === 'credit' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName || !formData.billingAddress || Object.keys(formErrors).length > 0)}
                      className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                    >
                      Continue to Review
                    </button>
                  </div>
                )}

                {/* Step 3: Review and Terms */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Review Your Order</h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        ← Back to Payment
                      </button>
                    </div>

                    {/* Contact Information Summary */}
                    <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FaUser className="mr-2 text-blue-400" />
                        Contact Information
                      </h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> {formData.fullName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                      </div>
                    </div>

                    {/* Payment Information Summary */}
                    <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FaCreditCard className="mr-2 text-green-400" />
                        Payment Method
                      </h4>
                      <div className="text-sm">
                        {paymentMethod === 'credit' ? (
                          <div className="space-y-1">
                            <p><strong>Method:</strong> Credit/Debit Card</p>
                            <p><strong>Card:</strong> **** **** **** {formData.cardNumber.slice(-4)}</p>
                            <p><strong>Card Type:</strong> {getCardType(formData.cardNumber)}</p>
                          </div>
                        ) : (
                          <p><strong>Method:</strong> PayPal</p>
                        )}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FaCircleCheck className="mr-2 text-green-400" />
                        Order Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Event: {selectedEvent.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date: {new Date(selectedEvent.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location: {selectedEvent.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tickets ({quantity}x @ ${selectedEvent.price})</span>
                          <span>${selectedEvent.price * quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee</span>
                          <span>$2.99</span>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total Amount</span>
                            <span className="text-green-400">${totalPrice + 2.99}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-2">
                        <FaShield className="text-green-400 mr-2" />
                        <span className="text-sm font-medium">Secure Transaction</span>
                      </div>
                      <p className="text-xs text-gray-300">
                        Your payment is protected by 256-bit SSL encryption and our secure payment partners.
                      </p>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          className="mt-1 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <label className="text-sm text-gray-300">
                          I agree to the{' '}
                          <a href="/terms" className="text-blue-400 hover:text-blue-300 underline" target="_blank">
                            Terms and Conditions
                          </a>{' '}
                          and{' '}
                          <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline" target="_blank">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          name="agreeRefund"
                          checked={formData.agreeRefund}
                          onChange={handleInputChange}
                          className="mt-1 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <label className="text-sm text-gray-300">
                          I understand the{' '}
                          <a href="/refund-policy" className="text-blue-400 hover:text-blue-300 underline" target="_blank">
                            Refund Policy
                          </a>{' '}
                          and cancellation terms for this event
                        </label>
                      </div>
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
                      disabled={loading || !formData.acceptTerms || !formData.agreeRefund}
                      className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <FaLock className="mr-2" />
                          Complete Purchase - ${totalPrice + 2.99}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyTicket;

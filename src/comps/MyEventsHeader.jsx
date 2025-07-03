import { useState } from "react";
import CreateEventModal from "./CreateEventModal";

const MyEventsHeader = ({ onEventCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    {
      label: "Created",
      value: 0,
      icon: "🎯",
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      label: "Subscribed", 
      value: 3,
      icon: "⭐",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    }
  ];

  return (
    <>
      <div className="relative mt-8 mb-6">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative bg-black">
          {/* Header Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              {/* Title */}
              <div className="mb-2 sm:mb-0">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  My Events
                </h2>
                <p className="text-sm text-gray-400 mt-1">Manage your events and subscriptions</p>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4 flex-wrap">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`group relative ${stat.bgColor} ${stat.borderColor} border rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm`}
                  >
                    {/* Animated background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                    
                    <div className="relative flex items-center gap-2">
                      <span className="text-lg animate-pulse">{stat.icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                        <p className="font-bold text-white text-lg">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Create Event Button */}
            <div className="relative">
              <button 
                onClick={() => setShowModal(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                
                {/* Button content */}
                <div className="relative flex items-center gap-2">
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-90' : 'rotate-0'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-medium">Create Event</span>
                </div>

                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150" />
                </div>
              </button>

              {/* Floating tooltip */}
              <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div className="bg-slate-800 text-white text-xs px-3 py-1 rounded-lg border border-slate-600 shadow-lg backdrop-blur-sm">
                  Start creating amazing events
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
                </div>
              </div>
            </div>
          </div>


          
          {/* Subtle animated particles */}
          <div className="absolute top-4 right-8 w-2 h-2 bg-purple-500/30 rounded-full animate-pulse" />
          <div className="absolute bottom-4 left-8 w-1 h-1 bg-emerald-500/40 rounded-full animate-ping" />
        </div>
      </div>

      {showModal && <CreateEventModal onClose={() => setShowModal(false)} onEventCreated={onEventCreated} />}
    </>
  );
};

export default MyEventsHeader;

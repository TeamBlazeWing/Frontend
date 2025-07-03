import { useState } from 'react';

const SubscribedEventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getStatusConfig = () => {
    // You can customize this based on event status
    return {
      label: 'Subscribed',
      icon: '⭐',
      gradient: 'from-emerald-500 to-teal-600',
      glowColor: 'emerald-500/50'
    };
  };

  const statusConfig = getStatusConfig();

  return (
    <div 
      className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-purple-500/20 border border-slate-700/50 hover:border-slate-600/50 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-emerald-500/10" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="relative h-40 sm:h-44 md:h-48 bg-gradient-to-br from-slate-700 to-slate-800">
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r ${statusConfig.gradient} text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm border border-white/20`}>
              <span className="animate-pulse">{statusConfig.icon}</span>
              <span className="hidden sm:inline">{statusConfig.label}</span>
              <span className="sm:hidden">Sub</span>
            </div>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <button className="p-1.5 sm:p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 hover:scale-110">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Loading Placeholder */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative p-4 sm:p-5 space-y-3 sm:space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight group-hover:from-emerald-400 group-hover:to-white transition-all duration-300 line-clamp-2">
            {event.title}
          </h3>
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-1.5 bg-emerald-500/20 rounded-lg flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs sm:text-sm text-gray-400">Price</span>
              <p className="font-semibold text-emerald-400 text-sm sm:text-base truncate">{event.price}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-1.5 bg-purple-500/20 rounded-lg flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs sm:text-sm text-gray-400">Location</span>
              <p className="font-medium text-gray-200 text-sm sm:text-base truncate">{event.location}</p>
            </div>
          </div>

          {/* Created By */}
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-1.5 bg-blue-500/20 rounded-lg flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs sm:text-sm text-gray-400">Created by</span>
              <p className="font-medium text-gray-200 text-sm sm:text-base truncate">{event.volunteer}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105">
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">View</span>
            </button>
            <button className="p-2 sm:p-2.5 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10`} />
      </div>
    </div>
  );
};

export default SubscribedEventCard;

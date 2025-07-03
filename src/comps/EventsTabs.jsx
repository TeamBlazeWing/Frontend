import { useState } from 'react';

const EventsTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('created');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const tabs = [
    {
      id: 'created',
      label: 'Created Events',
      icon: '🎯',
      color: 'purple',
      activeGradient: 'from-purple-500 to-purple-700',
      hoverGradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 'subscribed',
      label: 'Subscribed Events',
      icon: '⭐',
      color: 'green',
      activeGradient: 'from-green-500 to-green-700',
      hoverGradient: 'from-green-400 to-green-600'
    }
  ];

  return (
    <div className="relative mt-6 mb-8">
      {/* Background container with subtle gradient */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-1 shadow-2xl">
        <div className="flex relative bg-gray-900 rounded-2xl p-2">
          {/* Animated background indicator */}
          <div
            className={`absolute top-2 h-12 bg-gradient-to-r ${
              activeTab === 'created' ? tabs[0].activeGradient : tabs[1].activeGradient
            } rounded-xl transition-all duration-300 ease-in-out shadow-lg`}
            style={{
              width: 'calc(50% - 4px)',
              left: activeTab === 'created' ? '8px' : 'calc(50% + 4px)',
            }}
          />
          
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:' + tab.hoverGradient + ' hover:bg-opacity-20'
              }`}
              style={{
                zIndex: activeTab === tab.id ? 10 : 1,
              }}
            >
              {/* Icon with animation */}
              <span 
                className={`text-lg transition-transform duration-300 ${
                  activeTab === tab.id ? 'scale-110' : 'scale-100'
                }`}
              >
                {tab.icon}
              </span>
              
              {/* Label */}
              <span className="font-medium tracking-wide">
                {tab.label}
              </span>
              
              {/* Subtle glow effect for active tab */}
              {activeTab === tab.id && (
                <div className={`absolute inset-0 bg-gradient-to-r ${tab.activeGradient} rounded-xl opacity-20 blur-sm`} />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />
    </div>
  );
};

export default EventsTabs;

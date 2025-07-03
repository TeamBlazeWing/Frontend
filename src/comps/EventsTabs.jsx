import { useState } from 'react';

const EventsTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('created');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => handleTabClick('created')}
        className={`px-4 py-2 rounded-t-md font-semibold ${
          activeTab === 'created' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
        }`}
      >
        Created Events
      </button>
      <button
        onClick={() => handleTabClick('subscribed')}
        className={`px-4 py-2 rounded-t-md font-semibold ${
          activeTab === 'subscribed' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300'
        }`}
      >
        Subscribed Events
      </button>
    </div>
  );
};

export default EventsTabs;

import { useState } from "react";
import CreateEventModal from "./CreateEventModal";

const MyEventsHeader = ({ onEventCreated }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="flex items-center space-x-2">
          <p className="text-white">Created: <span className="font-bold">0</span></p>
          <p className="text-white">Subscribed: <span className="font-bold">3</span></p>
          <span className="bg-purple-700 text-white px-2 py-1 rounded text-sm">Basic Plan</span>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
          + Create Event
        </button>
      </div>

      {showModal && <CreateEventModal onClose={() => setShowModal(false)} onEventCreated={onEventCreated} />}
    </>
  );
};

export default MyEventsHeader;

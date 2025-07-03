import { useState } from "react";
import axios from "axios";

const CreateEventModal = ({ onClose, onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: "AI & The Future",
    description: "Exploring the rise of AI",
    type: "seminar",
    category: "tech",
    isFree: false,
    price: 12.5,
    date: "2025-08-05", // Format compatible with <input type="date">
    time: "2:30 PM",
    expirationDate: "2025-08-10", // Format compatible with <input type="date">
    location: "Colombo Tech Park",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    registrationLink: "https://simplytix.com/register/ai",
    tags: "AI, future, tech",
    maxAttendees: 150,
    attendees: 0
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim())
      };

      const res = await axios.post("http://localhost:3000/api/events", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("✅ Event created!");
      onEventCreated();
      onClose();
    } catch (err) {
      console.error("Event creation failed", err);
      alert("❌ Failed to create event. Are you subscribed?");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-2">Create New Event</h2>
        <p className="text-purple-400 mb-4 text-sm">Basic Plan - Monthly limit: 3</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={formData.title} placeholder="Title" onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <input name="price" type="number" value={formData.price} placeholder="Price ($)" onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} className="bg-gray-800 p-2 rounded md:col-span-2" />
          <input name="date" type="date" value={formData.date} onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <input name="time" type="text" value={formData.time} placeholder="Time (e.g. 3:00 PM)" onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <input name="expirationDate" type="date" value={formData.expirationDate} onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <input name="location" value={formData.location} placeholder="Location" onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <input name="imageUrl" value={formData.imageUrl} placeholder="Image URL" onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <input name="registrationLink" value={formData.registrationLink} placeholder="Registration Link" onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          <input name="tags" value={formData.tags} placeholder="Tags (comma separated)" onChange={handleChange} className="bg-gray-800 p-2 rounded" />
          
          <select name="type" value={formData.type} onChange={handleChange} className="bg-gray-800 p-2 rounded">
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="conference">Conference</option>
            <option value="meetup">Meetup</option>
            <option value="volunteer">Volunteer</option>
            <option value="other">Other</option>
          </select>

          <select name="category" value={formData.category} onChange={handleChange} className="bg-gray-800 p-2 rounded">
            <option value="tech">Tech</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="art">Art</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="social">Social</option>
          </select>

          <input name="maxAttendees" type="number" value={formData.maxAttendees} placeholder="Max Attendees" onChange={handleChange} className="bg-gray-800 p-2 rounded" />

          <label className="flex items-center gap-2 text-sm mt-2 md:col-span-2">
            <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} />
            This is a free event
          </label>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Create Event</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;

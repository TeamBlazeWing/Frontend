// EmptyEventMessage.jsx
export default function EmptyEventMessage() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 text-center text-white">
      <p className="text-lg font-semibold">No Events Found</p>
      <p className="text-sm text-gray-400">
        You haven’t created any events yet. Click 'Create Event' to get started!
      </p>
    </div>
  );
}

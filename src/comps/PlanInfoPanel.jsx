const PlanInfoPanel = () => {
  return (
    <div className="bg-green-800 text-white rounded-md p-4 flex justify-between items-center shadow-md">
      <div>
        <p className="font-semibold">Basic Plan - Active</p>
        <p className="text-sm">30 days remaining</p>
      </div>
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
        Upgrade Plan
      </button>
    </div>
  );
};

export default PlanInfoPanel;

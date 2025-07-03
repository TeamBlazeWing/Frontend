import { useState } from 'react';

const PlanInfoPanel = () => {
  const [isHovered, setIsHovered] = useState(false);

  const planData = {
    name: 'Basic Plan',
    status: 'Active',
    daysRemaining: 30,
    icon: '💎',
    statusIcon: '✅',
    features: ['Up to 5 Events', 'Basic Analytics', 'Email Support']
  };

  const getProgressWidth = () => {
    const totalDays = 30; // Assuming monthly plan
    return (planData.daysRemaining / totalDays) * 100;
  };

  const getProgressColor = () => {
    const percentage = getProgressWidth();
    if (percentage > 70) return 'from-green-400 to-green-600';
    if (percentage > 30) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-black from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-purple-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-green-500/10" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-xl" />
      </div>

      <div className="relative z-10 flex justify-between items-start">
        {/* Plan Information */}
        <div className="flex-1">
          {/* Header with Icons */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl animate-pulse">{planData.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {planData.name}
                </h3>
                <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                  {planData.statusIcon} {planData.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {planData.daysRemaining} days remaining
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400 font-medium">Plan Duration</span>
              <span className="text-xs text-gray-300 font-semibold">{planData.daysRemaining}/30 days</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-1000 ease-out rounded-full relative`}
                style={{ width: `${getProgressWidth()}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              </div>
            </div>
          </div>

          {/* Features Preview (shown on hover) */}
          <div className={`transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="text-xs text-gray-400 mb-1 font-medium">Plan Features:</div>
            <div className="flex flex-wrap gap-1">
              {planData.features.map((feature, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-md border border-slate-600"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Upgrade Button */}
        <div className="ml-6">
          <button className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900">
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            
            {/* Button Content */}
            <div className="relative flex items-center gap-2">
              <span>Upgrade Plan</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
          
          {/* Floating indicator */}
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 text-xs text-purple-400 font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              Premium
            </span>
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-green-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default PlanInfoPanel;

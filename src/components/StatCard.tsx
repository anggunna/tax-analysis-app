import { Component, JSX } from 'solid-js';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: JSX.Element;
  iconColor: string;
  progress?: number;
}

const StatCard: Component<StatCardProps> = (props) => {
  return (
    <div class="stat-card hover:transform hover:-translate-y-1 transition-transform">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-sm font-medium text-gray-600">{props.title}</h3>
        <button class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class={`w-14 h-14 rounded-2xl flex items-center justify-center ${props.iconColor}`}>
          {props.icon}
        </div>
        
        <div class="flex-1">
          <p class="text-2xl font-bold text-gray-900 mb-1">{props.value}</p>
          {props.change && (
            <div class={`flex items-center space-x-2 text-sm ${
              props.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{props.change}</span>
              <span class="text-gray-500">vs tahun lalu</span>
            </div>
          )}
          {props.progress !== undefined && (
            <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${props.progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
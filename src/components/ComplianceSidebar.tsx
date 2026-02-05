import { Component } from 'solid-js';
import { ComplianceCount } from '../types';

interface ComplianceSidebarProps {
  complianceCount: ComplianceCount;
}

const ComplianceSidebar: Component<ComplianceSidebarProps> = (props) => {
  const complianceItems = [
    {
      key: 'Sangat Patuh' as keyof ComplianceCount,
      label: 'Sangat Patuh',
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: 'bg-green-100 text-green-600'
    },
    {
      key: 'Patuh' as keyof ComplianceCount,
      label: 'Patuh',
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      colorClass: 'bg-blue-100 text-blue-600'
    },
    {
      key: 'Cukup Patuh' as keyof ComplianceCount,
      label: 'Cukup Patuh',
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      colorClass: 'bg-orange-100 text-orange-600'
    },
    {
      key: 'Tidak Patuh' as keyof ComplianceCount,
      label: 'Tidak Patuh',
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-5">Ringkasan Kepatuhan</h3>
      
      <div class="space-y-4">
        {complianceItems.map((item) => (
          <div class="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div class={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.colorClass} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            
            <div class="flex-1">
              <p class="text-sm text-gray-600 mb-1">{item.label}</p>
              <p class="text-lg font-semibold text-gray-900">
                {props.complianceCount[item.key]} items
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceSidebar;
import { Component } from 'solid-js';

const LoadingSpinner: Component = () => {
  return (
    <div class="flex items-center justify-center p-8">
      <div class="relative">
        <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div class="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style="animation-delay: 150ms;"></div>
      </div>
      <span class="ml-3 text-gray-600 font-medium">Memuat data...</span>
    </div>
  );
};

export default LoadingSpinner;
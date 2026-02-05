import { Component, onMount, onCleanup, JSX } from 'solid-js';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface ChartCardProps {
  title: string;
  description?: string;
  config: ChartConfiguration;
  isDark?: boolean;
  class?: string;
}

const ChartCard: Component<ChartCardProps> = (props) => {
  let canvasRef: HTMLCanvasElement;
  let chartInstance: Chart | null = null;

  onMount(() => {
    if (canvasRef) {
      chartInstance = new Chart(canvasRef, props.config);
    }
  });

  onCleanup(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  });

  return (
    <div class={`${props.isDark ? 'card-dark' : 'card'} p-7 ${props.class || ''}`}>
      <div class="mb-6">
        <h3 class={`text-lg font-semibold ${props.isDark ? 'text-white' : 'text-gray-900'}`}>
          {props.title}
        </h3>
        {props.description && (
          <p class={`text-sm mt-2 ${props.isDark ? 'text-white/60' : 'text-gray-600'}`}>
            {props.description}
          </p>
        )}
      </div>
      
      <div class="relative h-72">
        <canvas ref={canvasRef!} class="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default ChartCard;
import { Component, Show } from 'solid-js';
import { PredictionResult as PredictionResultType } from '../types';

interface PredictionResultProps {
  result: PredictionResultType | null;
}

const PredictionResult: Component<PredictionResultProps> = (props) => {
  const getBadgeColor = (tingkatKepatuhan: string) => {
    switch (tingkatKepatuhan) {
      case 'SANGAT PATUH':
        return 'from-green-500 to-green-600';
      case 'PATUH':
        return 'from-blue-500 to-blue-600';
      case 'CUKUP PATUH':
        return 'from-orange-500 to-orange-600';
      case 'TIDAK PATUH':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getConfidenceBarColor = (label: string) => {
    switch (label) {
      case 'Sangat Patuh':
        return 'from-green-500 to-green-600';
      case 'Patuh':
        return 'from-blue-500 to-blue-600';
      case 'Cukup Patuh':
        return 'from-orange-500 to-orange-600';
      case 'Tidak Patuh':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div class="card-dark p-7 hover:transform hover:-translate-y-1 transition-all duration-300 min-h-[500px]">
      <Show
        when={props.result}
        fallback={
          <div class="flex items-center justify-center h-full">
            <div class="text-center max-w-sm">
              <div class="w-24 h-24 mx-auto mb-6 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center border-2 border-blue-500 border-opacity-30">
                <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Siap Memprediksi</h3>
              <p class="text-white text-opacity-60 mb-8">Isi form di sebelah kiri untuk mendapatkan prediksi tingkat kepatuhan pajak</p>
              
              <div class="space-y-4">
                <div class="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="text-sm font-semibold text-white text-opacity-90">Prediksi Cepat</span>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span class="text-sm font-semibold text-white text-opacity-90">Akurasi Tinggi</span>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
                  <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span class="text-sm font-semibold text-white text-opacity-90">Confidence Score</span>
                </div>
              </div>
            </div>
          </div>
        }
      >
        {(result) => (
          <>
            <h3 class="text-lg font-semibold text-white mb-6">Hasil Prediksi</h3>
            
            {/* Result Badge */}
            <div class="flex justify-center mb-7">
              <div class={`inline-flex items-center space-x-3 px-7 py-3 bg-gradient-to-r ${getBadgeColor(result.tingkatKepatuhan)} text-white rounded-3xl font-semibold shadow-lg`}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>{result.tingkatKepatuhan}</span>
              </div>
            </div>
            
            {/* Percentage Result */}
            <div class="text-center mb-7 p-5 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
              <label class="block text-xs font-semibold text-white text-opacity-70 mb-2 uppercase tracking-wider">
                Rasio Hasil Kalkulasi:
              </label>
              <div class="text-4xl font-bold text-white">
                {result.persentase.toFixed(1)}%
              </div>
            </div>
            
            {/* Confidence Score */}
            <div>
              <label class="block text-xs font-semibold text-white text-opacity-70 mb-4 uppercase tracking-wider">
                Confidence Score (Probability Distribution):
              </label>
              
              <div class="space-y-3">
                {[
                  { label: 'Sangat Patuh', value: result.confidence.sangatPatuh },
                  { label: 'Patuh', value: result.confidence.patuh },
                  { label: 'Cukup Patuh', value: result.confidence.cukupPatuh },
                  { label: 'Tidak Patuh', value: result.confidence.tidakPatuh }
                ].map((item) => (
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-semibold text-white text-opacity-90">{item.label}:</span>
                      <span class="text-sm font-bold text-white">{item.value.toFixed(1)}%</span>
                    </div>
                    <div class="bg-white bg-opacity-5 rounded-full h-7 overflow-hidden border border-white border-opacity-10">
                      <div 
                        class={`h-full bg-gradient-to-r ${getConfidenceBarColor(item.label)} flex items-center justify-end pr-3 transition-all duration-700 ease-out rounded-full`}
                        style={{ width: `${item.value}%` }}
                      >
                        <span class="text-xs font-bold text-white">
                          {item.value.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </Show>
    </div>
  );
};

export default PredictionResult;
import { Component, createSignal } from 'solid-js';
import { PredictionInput } from '../types';

interface PredictionFormProps {
  onPredict: (input: PredictionInput) => void;
}

const PredictionForm: Component<PredictionFormProps> = (props) => {
  const [target, setTarget] = createSignal('');
  const [realisasi, setRealisasi] = createSignal('');
  const [jenisPajak, setJenisPajak] = createSignal('');
  const [tahun, setTahun] = createSignal('');

  const jenisPajakOptions = [
    'Pajak Hotel',
    'Pajak Restoran',
    'Pajak Hiburan',
    'Pajak Reklame',
    'Pajak Penerang Jalan (PPJ)',
    'Pajak Parkir',
    'Pajak PBB',
    'Pajak BPHTB'
  ];

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    if (!target() || !realisasi() || !jenisPajak() || !tahun()) {
      alert('Mohon lengkapi semua field');
      return;
    }

    props.onPredict({
      target: parseFloat(target()),
      realisasi: parseFloat(realisasi()),
      jenisPajak: jenisPajak(),
      tahun: parseInt(tahun())
    });
  };

  return (
    <div class="card-dark p-7 hover:transform hover:-translate-y-1 transition-all duration-300">
      <h3 class="text-lg font-semibold text-white mb-6">Form Input Data</h3>
      
      <form onSubmit={handleSubmit} class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-white text-opacity-90 mb-2">
            Target (Rp)
          </label>
          <input
            type="number"
            placeholder="Contoh: 5000000000"
            class="w-full px-4 py-3 border border-white border-opacity-20 rounded-2xl bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={target()}
            onInput={(e) => setTarget(e.currentTarget.value)}
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-white text-opacity-90 mb-2">
            Realisasi (Rp)
          </label>
          <input
            type="number"
            placeholder="Contoh: 5200000000"
            class="w-full px-4 py-3 border border-white border-opacity-20 rounded-2xl bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={realisasi()}
            onInput={(e) => setRealisasi(e.currentTarget.value)}
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-white text-opacity-90 mb-2">
            Jenis Pajak/Retribusi
          </label>
          <select
            class="w-full px-4 py-3 border border-white border-opacity-20 rounded-2xl bg-white bg-opacity-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={jenisPajak()}
            onChange={(e) => setJenisPajak(e.currentTarget.value)}
            required
          >
            <option value="" class="bg-slate-800 text-white">Pilih Jenis Pajak</option>
            {jenisPajakOptions.map((option) => (
              <option value={option} class="bg-slate-800 text-white">{option}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-white text-opacity-90 mb-2">
            Tahun
          </label>
          <input
            type="number"
            placeholder="Contoh: 2024"
            min="2016"
            max="2030"
            class="w-full px-4 py-3 border border-white border-opacity-20 rounded-2xl bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={tahun()}
            onInput={(e) => setTahun(e.currentTarget.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          class="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg mt-6"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>PREDIKSI</span>
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
import { Component } from 'solid-js';

interface HeroSectionProps {
  onNavigateToVisualisasi: () => void;
}

const HeroSection: Component<HeroSectionProps> = (props) => {
  return (
    <section id="home" class="min-h-screen flex items-center justify-center bg-gray-50 px-8 pt-24 pb-16 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div class="absolute top-0 left-0 w-96 h-96 bg-purple-500 bg-opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-pink-500 bg-opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 bg-opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      <div class="max-w-6xl mx-auto text-center relative z-10">
        <div class="mb-8">
          <div class="w-56 h-56 mx-auto mb-8 p-4">
            <img src="/logo.png" alt="Logo Bapenda" class="w-full h-full object-contain" />
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Badan Pendapatan Daerah
            <br />
            <span class="text-orange-600">Kabupaten Banyumas</span>
          </h1>
          
          <p class="text-xl text-orange-600 font-semibold mb-6">
            Dashboard Pajak & Retribusi Daerah
          </p>
          
          <p class="text-lg text-gray-600 leading-relaxed max-w-5xl mx-auto mb-12">
            Badan Pendapatan Daerah (Bapenda) Kabupaten Banyumas merupakan organisasi perangkat daerah yang memiliki tugas pokok mengelola dan mengoptimalkan pendapatan asli daerah (PAD) Kabupaten Banyumas. Bapenda Banyumas berkomitmen untuk meningkatkan pelayanan publik dalam bidang perpajakan daerah dan retribusi daerah melalui sistem yang transparan, akuntabel, dan berbasis teknologi informasi.
            <br /><br />
            Sebagai ujung tombak pengelolaan keuangan daerah, Bapenda Banyumas terus berinovasi dalam memberikan kemudahan kepada wajib pajak melalui digitalisasi layanan, edukasi perpajakan, dan penegakan peraturan yang adil. Dashboard ini merupakan bagian dari upaya transparansi dan akuntabilitas publik dalam memberikan informasi terkini mengenai kinerja pengelolaan pajak daerah Kabupaten Banyumas.
          </p>
          
          <button
            onClick={props.onNavigateToVisualisasi}
            class="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl inline-flex items-center space-x-2"
          >
            <span>Lihat Visualisasi</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
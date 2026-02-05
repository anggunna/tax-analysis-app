import { Component, createSignal } from 'solid-js';

interface NavbarProps {
  activeSection: () => string;
  onNavigate: (section: string) => void;
}

const Navbar: Component<NavbarProps> = (props) => {
  return (
    <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div class="bg-black/90 backdrop-blur-xl rounded-full px-2 py-1.5 flex items-center gap-1.5 border border-white/10 shadow-2xl">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            props.onNavigate('home');
          }}
          class={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            props.activeSection() === 'home'
              ? 'bg-white text-black font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Home
        </a>
        <a
          href="#visualisasi"
          onClick={(e) => {
            e.preventDefault();
            props.onNavigate('visualisasi');
          }}
          class={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            props.activeSection() === 'visualisasi'
              ? 'bg-white text-black font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Visualisasi
        </a>
        <a
          href="#prediksi"
          onClick={(e) => {
            e.preventDefault();
            props.onNavigate('prediksi');
          }}
          class={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            props.activeSection() === 'prediksi'
              ? 'bg-white text-black font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Prediksi
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
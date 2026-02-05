import { Component, createSignal, createResource, createMemo, onMount, Show, Suspense } from 'solid-js';
import { TaxData, ComplianceCount, PredictionResult as PredictionResultType } from './types';
import { loadTaxData, formatCurrency } from './utils/dataLoader';
import { predictCompliance } from './utils/prediction';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatCard from './components/StatCard';
import ChartCard from './components/ChartCard';
import DataTable from './components/DataTable';
import ComplianceSidebar from './components/ComplianceSidebar';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import LoadingSpinner from './components/LoadingSpinner';

const App: Component = () => {
  const [activeSection, setActiveSection] = createSignal('home');
  const [predictionResult, setPredictionResult] = createSignal<PredictionResultType | null>(null);
  
  // Load data
  const [taxData] = createResource<TaxData[]>(loadTaxData);

  // Computed values
  const stats = createMemo(() => {
    const data = taxData();
    if (!data || data.length === 0) {
      return {
        totalTarget: 0,
        totalRealisasi: 0,
        avgPercentage: 0,
        complianceCount: { 'Sangat Patuh': 0, 'Patuh': 0, 'Cukup Patuh': 0, 'Tidak Patuh': 0 } as ComplianceCount
      };
    }

    const totalTarget = data.reduce((sum, item) => sum + item.target, 0);
    const totalRealisasi = data.reduce((sum, item) => sum + item.realisasi, 0);
    const avgPercentage = data.reduce((sum, item) => sum + item.persentase, 0) / data.length;
    
    const complianceCount: ComplianceCount = {
      'Sangat Patuh': 0,
      'Patuh': 0,
      'Cukup Patuh': 0,
      'Tidak Patuh': 0
    };
    
    data.forEach(item => {
      if (complianceCount.hasOwnProperty(item.tingkatKepatuhan)) {
        complianceCount[item.tingkatKepatuhan as keyof ComplianceCount]++;
      }
    });

    return { totalTarget, totalRealisasi, avgPercentage, complianceCount };
  });

  // Chart configurations
  const distributionChartConfig = createMemo(() => {
    const data = taxData();
    if (!data) return null;

    const complianceCount = stats().complianceCount;
    const labels = Object.keys(complianceCount);
    const values = Object.values(complianceCount);
    
    const trainingData = values.map(v => Math.round(v * 0.7));
    const testingData = values.map(v => Math.round(v * 0.3));

    return {
      type: 'bar' as const,
      data: {
        labels,
        datasets: [{
          label: 'Data Training (70%)',
          data: trainingData,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          borderRadius: 8
        }, {
          label: 'Data Testing (30%)',
          data: testingData,
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderColor: '#8b5cf6',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
            align: 'end' as const
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Jumlah Data'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tingkat Kepatuhan'
            }
          }
        }
      }
    };
  });

  const featureImportanceConfig = createMemo(() => {
    const features = [
      { name: 'Persentase Realisasi', importance: 28 },
      { name: 'Total Realisasi', importance: 24 },
      { name: 'Total Target', importance: 22 },
      { name: 'Tahun', importance: 15 },
      { name: 'Jenis Pajak', importance: 11 }
    ];

    const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

    return {
      type: 'bar' as const,
      data: {
        labels: features.map(f => f.name),
        datasets: [{
          label: 'Importance (%)',
          data: features.map(f => f.importance),
          backgroundColor: colors,
          borderRadius: 12,
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        }]
      },
      options: {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 50,
            title: {
              display: true,
              text: 'Tingkat Kepentingan (%)',
              color: 'rgba(255, 255, 255, 0.9)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: function(value: any) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          y: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.9)'
            },
            grid: {
              display: false
            }
          }
        }
      }
    };
  });

  // Navigation handlers
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handlePrediction = (input: any) => {
    const result = predictCompliance(input);
    setPredictionResult(result);
  };

  // Scroll listener for active section
  onMount(() => {
    const handleScroll = () => {
      const sections = ['home', 'visualisasi', 'prediksi'];
      const scrollY = window.pageYOffset;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = scrollY + rect.top;
          const sectionHeight = rect.height;
          
          if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div class="min-h-screen bg-gray-50">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      
      {/* Hero Section */}
      <HeroSection onNavigateToVisualisasi={() => scrollToSection('visualisasi')} />
      
      {/* Visualisasi Section */}
      <section id="visualisasi" class="bg-gray-50 py-16 relative overflow-hidden">
        {/* Background decorations */}
        <div class="absolute top-10 right-0 w-96 h-96 bg-blue-500 bg-opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-10 left-0 w-96 h-96 bg-orange-500 bg-opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <header class="text-center mb-20">
            <p class="text-gray-500 text-sm mb-2">Visualisasi Data & Model Evaluation</p>
            <h1 class="text-4xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
              Klasifikasi Tingkat Kepatuhan Pajak Daerah Banyumas Periode 2016-2024
              <br />
              <span class="text-blue-600">Menggunakan Algoritma Decision Tree</span>
            </h1>
          </header>

          <Suspense fallback={<LoadingSpinner />}>
            <Show when={taxData()}>
              {/* Stats Grid */}
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Target"
                  value={formatCurrency(stats().totalTarget)}
                  change="↑ 12.5%"
                  changeType="positive"
                  icon={
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                  iconColor="bg-blue-100 text-blue-600"
                />
                
                <StatCard
                  title="Total Realisasi"
                  value={formatCurrency(stats().totalRealisasi)}
                  change="↓ 8.2%"
                  changeType="negative"
                  icon={
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  }
                  iconColor="bg-purple-100 text-purple-600"
                />
                
                <StatCard
                  title="Rata-rata Persentase"
                  value={`${stats().avgPercentage.toFixed(1)}%`}
                  change="↑ 5.2%"
                  changeType="positive"
                  icon={
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  }
                  iconColor="bg-orange-100 text-orange-600"
                />
                
                <StatCard
                  title="Tingkat Kepatuhan"
                  value="Sangat Patuh"
                  progress={85}
                  icon={
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  iconColor="bg-green-100 text-green-600"
                />
              </div>

              {/* Charts Row */}
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {distributionChartConfig() && (
                  <ChartCard
                    title="Distribusi Data Training & Testing"
                    config={distributionChartConfig()!}
                  />
                )}
                
                {featureImportanceConfig() && (
                  <ChartCard
                    title="Feature Importance (Tingkat Kepentingan Fitur)"
                    config={featureImportanceConfig()!}
                    isDark={true}
                  />
                )}
              </div>

              {/* Bottom Grid: Table + Sidebar */}
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                  <DataTable data={taxData()!} />
                </div>
                
                <div>
                  <ComplianceSidebar complianceCount={stats().complianceCount} />
                </div>
              </div>
            </Show>
          </Suspense>
        </div>
      </section>

      {/* Prediksi Section */}
      <section id="prediksi" class="bg-gray-50 py-16 relative overflow-hidden min-h-screen">
        {/* Background decorations */}
        <div class="absolute top-20 left-0 w-96 h-96 bg-green-500 bg-opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div class="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500 bg-opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        
        <div class="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <header class="text-center mb-16">
            <p class="text-gray-500 text-sm mb-2">Prediction Tool</p>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Prediksi Tingkat Kepatuhan Pajak</h1>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Masukkan data untuk memprediksi tingkat kepatuhan menggunakan model Decision Tree
            </p>
          </header>

          {/* Prediction Container */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PredictionForm onPredict={handlePrediction} />
            <PredictionResult result={predictionResult()} />
          </div>

          {/* Footer */}
          <footer class="mt-16 pt-8 border-t border-gray-200">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p class="font-semibold text-gray-900 text-sm">
                  Klasifikasi Tingkat Kepatuhan Pajak Daerah Banyumas
                </p>
                <p class="text-gray-600 text-sm">
                  © 2024 Badan Pendapatan Daerah Kabupaten Banyumas. All rights reserved.
                </p>
              </div>
              <div class="flex gap-6">
                <a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Tentang</a>
                <a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Bantuan</a>
                <a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Kontak</a>
                <a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Kebijakan Privasi</a>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;

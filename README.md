# Dashboard Pajak & Retribusi Daerah Banyumas

Dashboard modern untuk analisis dan prediksi tingkat kepatuhan pajak daerah Kabupaten Banyumas menggunakan Solid.js dan Tailwind CSS.

## 🚀 Fitur Utama

- **Dashboard Interaktif**: Visualisasi data pajak dan retribusi daerah periode 2016-2024
- **Analisis Data**: Statistik komprehensif dengan chart dan grafik interaktif
- **Prediksi AI**: Sistem prediksi tingkat kepatuhan menggunakan algoritma Decision Tree
- **Responsive Design**: Tampilan optimal di semua perangkat
- **Modern UI**: Interface yang clean dan user-friendly dengan Tailwind CSS

## 🛠️ Teknologi

- **Frontend**: Solid.js + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Build Tool**: Vite
- **Data**: CSV parsing untuk data pajak

## 📊 Komponen Utama

### 1. Hero Section
- Landing page dengan informasi Bapenda Banyumas
- Navigasi smooth scroll ke section lain

### 2. Visualisasi Data
- **Statistik Cards**: Total target, realisasi, rata-rata persentase, tingkat kepatuhan
- **Chart Training/Testing**: Distribusi data untuk model machine learning
- **Feature Importance**: Tingkat kepentingan fitur dalam prediksi
- **Data Table**: Tabel interaktif dengan search dan filter
- **Compliance Sidebar**: Ringkasan kepatuhan per kategori

### 3. Prediksi
- **Form Input**: Input data untuk prediksi (target, realisasi, jenis pajak, tahun)
- **Hasil Prediksi**: Tingkat kepatuhan dengan confidence score
- **Probability Distribution**: Visualisasi probabilitas setiap kategori kepatuhan

## 🏃‍♂️ Cara Menjalankan

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```

3. **Buka browser**: http://localhost:3000

4. **Build untuk production**:
   ```bash
   npm run build
   ```

## 📁 Struktur Project

```
src/
├── components/          # Komponen UI
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── StatCard.tsx
│   ├── ChartCard.tsx
│   ├── DataTable.tsx
│   ├── ComplianceSidebar.tsx
│   ├── PredictionForm.tsx
│   └── PredictionResult.tsx
├── types/              # TypeScript interfaces
│   └── index.ts
├── utils/              # Utility functions
│   ├── dataLoader.ts
│   └── prediction.ts
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── index.css           # Global styles

public/
├── sample-data.csv     # Data pajak daerah
└── logo.png           # Logo Bapenda
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Secondary**: Purple (#8b5cf6), Orange (#f59e0b), Green (#10b981)
- **Status Colors**: Success (Green), Warning (Orange), Danger (Red)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Charts**: Interactive dengan Chart.js
- **Tables**: Responsive dengan pagination dan search

## 📈 Data Model

### TaxData Interface
```typescript
interface TaxData {
  tahun: number;
  jenisPajak: string;
  target: number;
  realisasi: number;
  persentase: number;
  tingkatKepatuhan: string;
}
```

### Prediction Logic
- **Sangat Patuh**: Persentase ≥ 100%
- **Patuh**: Persentase 90-99%
- **Cukup Patuh**: Persentase 75-89%
- **Tidak Patuh**: Persentase < 75%

## 🔧 Kustomisasi

### Menambah Jenis Pajak Baru
Edit file `src/components/PredictionForm.tsx` pada array `jenisPajakOptions`.

### Mengubah Algoritma Prediksi
Modifikasi fungsi `predictCompliance` di `src/utils/prediction.ts`.

### Styling
Semua styling menggunakan Tailwind CSS. Kustomisasi di `tailwind.config.js` dan `src/index.css`.

## 📝 License

© 2024 Badan Pendapatan Daerah Kabupaten Banyumas. All rights reserved.

---

**Developed with ❤️ using Solid.js & Tailwind CSS**
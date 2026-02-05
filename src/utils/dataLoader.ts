import { TaxData } from '../types';

export async function loadTaxData(): Promise<TaxData[]> {
  try {
    const response = await fetch('/sample-data.csv');
    const csvText = await response.text();
    
    // Parse CSV
    const lines = csvText.trim().split('\n');
    
    const data = lines.slice(1).map(line => {
      const values = line.split(';');
      return {
        tahun: parseInt(values[0]),
        jenisPajak: values[1].trim(),
        target: parseInt(values[2]),
        realisasi: parseInt(values[3]),
        persentase: parseInt(values[4]),
        tingkatKepatuhan: values[5].trim()
      };
    });
    
    console.log('✅ Data loaded:', data.length, 'rows');
    return data;
  } catch (error) {
    console.error('❌ Error loading CSV:', error);
    throw new Error('Gagal memuat data CSV');
  }
}

export function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return 'Rp ' + (value / 1000000000).toFixed(2) + ' M';
  } else if (value >= 1000000) {
    return 'Rp ' + (value / 1000000).toFixed(2) + ' Jt';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
}
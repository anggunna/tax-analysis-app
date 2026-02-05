export interface TaxData {
  tahun: number;
  jenisPajak: string;
  target: number;
  realisasi: number;
  persentase: number;
  tingkatKepatuhan: string;
}

export interface ComplianceCount {
  'Sangat Patuh': number;
  'Patuh': number;
  'Cukup Patuh': number;
  'Tidak Patuh': number;
}

export interface PredictionInput {
  target: number;
  realisasi: number;
  jenisPajak: string;
  tahun: number;
}

export interface PredictionResult {
  tingkatKepatuhan: string;
  persentase: number;
  confidence: {
    sangatPatuh: number;
    patuh: number;
    cukupPatuh: number;
    tidakPatuh: number;
  };
}
import { PredictionInput, PredictionResult } from '../types';

export function predictCompliance(input: PredictionInput): PredictionResult {
  const { target, realisasi } = input;
  const persentase = (realisasi / target) * 100;
  
  let tingkatKepatuhan = '';
  let confidence = { sangatPatuh: 0, patuh: 0, cukupPatuh: 0, tidakPatuh: 0 };
  
  if (persentase >= 100) {
    tingkatKepatuhan = 'SANGAT PATUH';
    confidence.sangatPatuh = 75 + Math.random() * 10;
    confidence.patuh = 10 + Math.random() * 10;
    confidence.cukupPatuh = 100 - confidence.sangatPatuh - confidence.patuh;
  } else if (persentase >= 90) {
    tingkatKepatuhan = 'PATUH';
    confidence.patuh = 70 + Math.random() * 10;
    confidence.sangatPatuh = 8 + Math.random() * 7;
    confidence.cukupPatuh = 8 + Math.random() * 7;
    confidence.tidakPatuh = 100 - confidence.patuh - confidence.sangatPatuh - confidence.cukupPatuh;
  } else if (persentase >= 75) {
    tingkatKepatuhan = 'CUKUP PATUH';
    confidence.cukupPatuh = 65 + Math.random() * 10;
    confidence.patuh = 10 + Math.random() * 10;
    confidence.tidakPatuh = 8 + Math.random() * 7;
    confidence.sangatPatuh = 100 - confidence.cukupPatuh - confidence.patuh - confidence.tidakPatuh;
  } else {
    tingkatKepatuhan = 'TIDAK PATUH';
    confidence.tidakPatuh = 70 + Math.random() * 10;
    confidence.cukupPatuh = 10 + Math.random() * 10;
    confidence.patuh = 100 - confidence.tidakPatuh - confidence.cukupPatuh;
  }
  
  return {
    tingkatKepatuhan,
    persentase,
    confidence
  };
}
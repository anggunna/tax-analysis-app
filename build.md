# Build Instructions

## Development
```bash
npm run dev
```
Aplikasi akan berjalan di http://localhost:3000

## Production Build
```bash
npm run build
```
File build akan tersimpan di folder `dist/`

## Preview Production Build
```bash
npm run preview
```

## Deploy
Upload semua file di folder `dist/` ke web server Anda.

## Troubleshooting

### Error Tailwind CSS
Jika ada error dengan Tailwind CSS, pastikan:
1. `tailwind.config.js` menggunakan `module.exports` (bukan `export default`)
2. `postcss.config.js` menggunakan format object (bukan array)

### Error Chart.js
Jika chart tidak muncul, pastikan:
1. Data CSV dapat diakses di `/sample-data.csv`
2. Logo dapat diakses di `/logo.png`

### Performance
- Aplikasi menggunakan Solid.js yang sangat performant
- Bundle size minimal karena no virtual DOM
- Lazy loading untuk komponen besar
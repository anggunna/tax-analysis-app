import { Component, For, createSignal, createMemo } from 'solid-js';
import { TaxData } from '../types';
import { formatCurrency } from '../utils/dataLoader';

interface DataTableProps {
  data: TaxData[];
}

const DataTable: Component<DataTableProps> = (props) => {
  const [currentPage, setCurrentPage] = createSignal(1);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [selectedYear, setSelectedYear] = createSignal('');
  const itemsPerPage = 10;

  const years = createMemo(() => {
    const uniqueYears = [...new Set(props.data.map(d => d.tahun))].sort((a, b) => b - a);
    return uniqueYears;
  });

  const filteredData = createMemo(() => {
    return props.data.filter(item => {
      const matchesSearch = item.jenisPajak.toLowerCase().includes(searchTerm().toLowerCase());
      const matchesYear = !selectedYear() || item.tahun.toString() === selectedYear();
      return matchesSearch && matchesYear;
    }).sort((a, b) => b.tahun - a.tahun);
  });

  const paginatedData = createMemo(() => {
    const start = (currentPage() - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData().slice(start, end);
  });

  const totalPages = createMemo(() => Math.ceil(filteredData().length / itemsPerPage));

  const getBadgeClass = (compliance: string) => {
    switch (compliance) {
      case 'Sangat Patuh': return 'badge-success';
      case 'Patuh': return 'badge-success';
      case 'Cukup Patuh': return 'badge-warning';
      case 'Tidak Patuh': return 'badge-danger';
      default: return 'badge-success';
    }
  };

  return (
    <div class="card p-7">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Data Terbaru</h3>
        
        <div class="flex space-x-3">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari jenis pajak/retribusi..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-2xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-60"
              value={searchTerm()}
              onInput={(e) => setSearchTerm(e.currentTarget.value)}
            />
          </div>
          
          <select
            class="px-4 py-2 border border-gray-300 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedYear()}
            onChange={(e) => setSelectedYear(e.currentTarget.value)}
          >
            <option value="">Semua Tahun</option>
            <For each={years()}>
              {(year) => <option value={year}>{year}</option>}
            </For>
          </select>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-gray-200">
        <div class="overflow-x-auto max-h-96">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tahun</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jenis Pajak/Retribusi</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Target</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Realisasi</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Persentase</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <For each={paginatedData()}>
                {(item) => (
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 text-sm text-gray-900">{item.tahun}</td>
                    <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{item.jenisPajak}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">{formatCurrency(item.target)}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">{formatCurrency(item.realisasi)}</td>
                    <td class="px-6 py-4 text-sm font-semibold text-gray-900">{item.persentase}%</td>
                    <td class="px-6 py-4">
                      <span class={`badge ${getBadgeClass(item.tingkatKepatuhan)}`}>
                        {item.tingkatKepatuhan}
                      </span>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage() - 1))}
          disabled={currentPage() === 1}
          class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        
        <span class="text-sm text-gray-600">
          Page <span class="font-semibold text-gray-900">{currentPage()}</span> of{' '}
          <span class="font-semibold text-gray-900">{totalPages()}</span>
        </span>
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages(), currentPage() + 1))}
          disabled={currentPage() === totalPages()}
          class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DataTable;
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  onAddNew?: () => void;
  addNewText?: string;
  emptyText?: string;
}

export function AdminTable<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = "Filter records...",
  searchFilter,
  onAddNew,
  addNewText = "Create New",
  emptyText = "No items recorded in this section."
}: AdminTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = searchQuery && searchFilter
    ? data.filter((item) => searchFilter(item, searchQuery))
    : data;

  return (
    <div className="bg-[#12141c] border border-[#d4af37]/20 rounded-xl overflow-hidden shadow-xl">
      {/* Table controls */}
      <div className="p-4 bg-[#181b26] border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96a6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-[#12141c] border border-white/10 rounded-md px-3 py-2 pl-9 text-xs text-white placeholder-[#646c7d] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {onAddNew && (
          <button
            onClick={onAddNew}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] hover:to-[#be9128] text-black text-xs font-bold rounded shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{addNewText}</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#9da5b4]">
          <thead className="bg-[#0b0c10] text-[11px] uppercase tracking-wider text-[#d4af37] border-b border-white/5 font-mono">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-3.5 font-semibold ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map((col, idx) => (
                    <td key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                      {col.render
                        ? col.render(item)
                        : col.accessor
                        ? String(item[col.accessor] ?? '')
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-[#6e7687]">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

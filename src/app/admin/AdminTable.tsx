import type { ReactNode } from "react";

export type AdminRow = {
  id: string;
  cells: ReactNode[];
};

export function AdminTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: AdminRow[];
}) {
  return (
    <div className="rounded-2xl border border-ink-700/60 bg-ink-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-ink-800/60 text-[11.5px] text-ink-400 font-semibold">
            <tr>
              {headers.map((h) => (
                <th key={h} className="text-left px-5 py-3.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700/60">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-ink-800/40 transition-colors">
                {r.cells.map((c, i) => (
                  <td key={i} className="px-5 py-4 align-top text-ink-200">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

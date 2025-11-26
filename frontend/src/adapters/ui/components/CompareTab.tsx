import React, { useEffect, useState } from "react";
import { RouteServiceHttp } from "../../infrastructure/api/RouteServiceHttp";
import { ComparisonRow } from "../../../core/domain/compliance";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from "recharts";

const routeService = new RouteServiceHttp();

export const CompareTab: React.FC = () => {
  const [rows, setRows] = useState<ComparisonRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await routeService.fetchComparison();
        setRows(data);
      } catch (e: any) {
        setError(e.message ?? "Failed to load comparison");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const chartData = rows.map((r) => ({
    routeId: r.routeId,
    baseline: r.baselineGhg,
    comparison: r.comparisonGhg
  }));

  return (
    <div className="space-y-6">
      {loading && <p className="text-sm text-slate-400">Loading comparison…</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-3 py-2 text-left">Route</th>
              <th className="px-3 py-2 text-right">Baseline (gCO₂e/MJ)</th>
              <th className="px-3 py-2 text-right">Comparison (gCO₂e/MJ)</th>
              <th className="px-3 py-2 text-right">% diff</th>
              <th className="px-3 py-2 text-right">Compliant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((r) => (
              <tr key={r.routeId}>
                <td className="px-3 py-2">{r.routeId}</td>
                <td className="px-3 py-2 text-right">
                  {r.baselineGhg.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right">
                  {r.comparisonGhg.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right">
                  {r.percentDiff.toFixed(2)}%
                </td>
                <td className="px-3 py-2 text-right">
                  {r.compliant ? "✅" : "❌"}
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr>
                <td className="px-3 py-4 text-center text-slate-400" colSpan={5}>
                  No comparison data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {rows.length > 0 && (
        <div className="h-72 rounded-xl bg-slate-900/80 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="routeId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="baseline" />
              <Bar dataKey="comparison" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

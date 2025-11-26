import React from "react";
import { useRoutes } from "../hooks/useRoutes";

export const RoutesTab: React.FC = () => {
  const { routes, loading, error, filters, setFilters, setBaseline } = useRoutes();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select
          className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm"
          value={filters.vesselType}
          onChange={(e) => setFilters((f) => ({ ...f, vesselType: e.target.value }))}
        >
          <option value="">All vessel types</option>
          <option value="Container">Container</option>
          <option value="BulkCarrier">BulkCarrier</option>
          <option value="Tanker">Tanker</option>
          <option value="RoRo">RoRo</option>
        </select>
        <select
          className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm"
          value={filters.fuelType}
          onChange={(e) => setFilters((f) => ({ ...f, fuelType: e.target.value }))}
        >
          <option value="">All fuels</option>
          <option value="HFO">HFO</option>
          <option value="LNG">LNG</option>
          <option value="MGO">MGO</option>
        </select>
        <select
          className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm"
          value={filters.year}
          onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
        >
          <option value="">All years</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {loading && <p className="text-sm text-slate-400">Loading routes…</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-3 py-2 text-left">Route ID</th>
              <th className="px-3 py-2 text-left">Vessel</th>
              <th className="px-3 py-2 text-left">Fuel</th>
              <th className="px-3 py-2 text-left">Year</th>
              <th className="px-3 py-2 text-right">gCO₂e/MJ</th>
              <th className="px-3 py-2 text-right">Fuel (t)</th>
              <th className="px-3 py-2 text-right">Distance (km)</th>
              <th className="px-3 py-2 text-right">Emissions (t)</th>
              <th className="px-3 py-2 text-right">Baseline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {routes.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2">{r.routeId}</td>
                <td className="px-3 py-2">{r.vesselType}</td>
                <td className="px-3 py-2">{r.fuelType}</td>
                <td className="px-3 py-2">{r.year}</td>
                <td className="px-3 py-2 text-right">{r.ghgIntensity.toFixed(2)}</td>
                <td className="px-3 py-2 text-right">
                  {r.fuelConsumptionTonnes.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">
                  {r.distanceKm.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">
                  {r.totalEmissionsTonnes.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">
                  {r.isBaseline ? (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                      Baseline
                    </span>
                  ) : (
                    <button
                      className="rounded-full bg-sky-500/80 px-3 py-1 text-xs font-medium hover:bg-sky-500"
                      onClick={() => setBaseline(r.id)}
                    >
                      Set Baseline
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {routes.length === 0 && !loading && (
              <tr>
                <td className="px-3 py-4 text-center text-slate-400" colSpan={9}>
                  No routes matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

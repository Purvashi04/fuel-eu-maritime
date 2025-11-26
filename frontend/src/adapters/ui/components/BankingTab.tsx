import React, { useEffect, useState } from "react";
import { http } from "../../infrastructure/api/httpClient";
import { CBRecord, BankEntry, BankingKPI } from "../../../core/domain/banking";

const defaultShipId = "SHIP-001";

export const BankingTab: React.FC = () => {
  const [year, setYear] = useState("2025");
  const [cb, setCb] = useState<CBRecord | null>(null);
  const [entries, setEntries] = useState<BankEntry[]>([]);
  const [applyAmount, setApplyAmount] = useState("");
  const [kpis, setKpis] = useState<BankingKPI | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    const y = Number(year);
    const cbRes = await http.get<CBRecord>("/compliance/cb", {
      params: { shipId: defaultShipId, year: y }
    });
    setCb(cbRes.data);
    const bankRes = await http.get<BankEntry[]>("/banking/records", {
      params: { shipId: defaultShipId, year: y }
    });
    setEntries(bankRes.data);
  };

  useEffect(() => {
    void load();
  }, [year]);

  const handleBank = async () => {
    try {
      setError(null);
      const res = await http.post<BankEntry>("/banking/bank", {
        shipId: defaultShipId,
        year: Number(year)
      });
      setEntries((prev) => [...prev, res.data]);
    } catch (e: any) {
      setError(e.response?.data?.error ?? "Failed to bank surplus");
    }
  };

  const handleApply = async () => {
    try {
      setError(null);
      const res = await http.post<BankingKPI>("/banking/apply", {
        shipId: defaultShipId,
        year: Number(year),
        amount: Number(applyAmount)
      });
      setKpis(res.data);
      await load();
    } catch (e: any) {
      setError(e.response?.data?.error ?? "Failed to apply banking");
    }
  };

  const cbValue = cb?.cbGco2eq ?? 0;
  const canBank = cbValue > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-300">
          Year
          <select
            className="ml-2 rounded-lg bg-slate-800 px-3 py-1.5 text-sm"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Compliance Balance
          </p>
          <p className="mt-2 text-lg font-semibold">
            {cbValue.toFixed(0)} gCO₂e
          </p>
          <button
            disabled={!canBank}
            onClick={handleBank}
            className={`mt-3 rounded-lg px-3 py-1.5 text-sm font-medium ${
              canBank
                ? "bg-emerald-500 text-white hover:bg-emerald-400"
                : "cursor-not-allowed bg-slate-700 text-slate-400"
            }`}
          >
            Bank surplus
          </button>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Apply banked
          </p>
          <input
            type="number"
            className="mt-2 w-full rounded-lg bg-slate-800 px-3 py-1.5 text-sm"
            placeholder="Amount to apply (gCO₂e)"
            value={applyAmount}
            onChange={(e) => setApplyAmount(e.target.value)}
          />
          <button
            onClick={handleApply}
            className="mt-3 w-full rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-medium hover:bg-sky-400"
          >
            Apply to deficit
          </button>
          {kpis && (
            <div className="mt-3 text-xs text-slate-300">
              <div>CB before: {kpis.cb_before.toFixed(0)}</div>
              <div>Applied: {kpis.applied.toFixed(0)}</div>
              <div>CB after: {kpis.cb_after.toFixed(0)}</div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Banked records
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            {entries.map((e) => (
              <li key={e.id} className="flex justify-between">
                <span>{new Date(e.createdAt).toLocaleDateString()}</span>
                <span>{e.amountGco2eq.toFixed(0)} gCO₂e</span>
              </li>
            ))}
            {entries.length === 0 && (
              <li className="text-slate-500">No banked entries yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

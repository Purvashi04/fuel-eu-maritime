import React, { useState } from "react";
import { PoolMemberInput, PoolMember } from "../../../core/domain/pooling";
import { PoolingServiceHttp } from "../../infrastructure/api/PoolingServiceHttp";

const poolingService = new PoolingServiceHttp();

export const PoolingTab: React.FC = () => {
  const [year, setYear] = useState("2025");
  const [members, setMembers] = useState<PoolMemberInput[]>([
    { shipId: "SHIP-A", cbBefore: 10000 },
    { shipId: "SHIP-B", cbBefore: -4000 }
  ]);
  const [result, setResult] = useState<PoolMember[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateMember = (index: number, field: keyof PoolMemberInput, value: string) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: field === "cbBefore" ? Number(value) : value
      };
      return copy;
    });
  };

  const addMember = () => {
    setMembers((prev) => [...prev, { shipId: "", cbBefore: 0 }]);
  };

  const poolSum = members.reduce((acc, m) => acc + m.cbBefore, 0);
  const isValid = poolSum >= 0 && members.every((m) => m.shipId.trim().length > 0);

  const onCreatePool = async () => {
    try {
      setError(null);
      const res = await poolingService.createPool(Number(year), members);
      setResult(res);
    } catch (e: any) {
      setError(e.response?.data?.error ?? "Failed to create pool");
    }
  };

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

      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold">Pool members</h2>
          <button
            onClick={addMember}
            className="rounded-lg bg-slate-700 px-3 py-1 text-xs hover:bg-slate-600"
          >
            + Add member
          </button>
        </div>

        <div className="space-y-2">
          {members.map((m, idx) => (
            <div key={idx} className="grid gap-2 md:grid-cols-2">
              <input
                className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm"
                placeholder="Ship ID"
                value={m.shipId}
                onChange={(e) => updateMember(idx, "shipId", e.target.value)}
              />
              <input
                type="number"
                className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm"
                placeholder="CB before (gCO₂e)"
                value={m.cbBefore}
                onChange={(e) => updateMember(idx, "cbBefore", e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span>Pool sum:</span>
          <span
            className={
              poolSum >= 0 ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"
            }
          >
            {poolSum.toFixed(0)} gCO₂e
          </span>
        </div>

        <button
          disabled={!isValid}
          onClick={onCreatePool}
          className={`mt-3 w-full rounded-lg px-3 py-1.5 text-sm font-medium ${
            isValid
              ? "bg-emerald-500 text-white hover:bg-emerald-400"
              : "cursor-not-allowed bg-slate-700 text-slate-400"
          }`}
        >
          Create pool
        </button>
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>

      {result && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-sm font-semibold mb-2">Pool allocation result</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-3 py-2 text-left">Ship</th>
                  <th className="px-3 py-2 text-right">CB before</th>
                  <th className="px-3 py-2 text-right">CB after</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {result.map((m) => (
                  <tr key={m.shipId}>
                    <td className="px-3 py-2">{m.shipId}</td>
                    <td className="px-3 py-2 text-right">{m.cbBefore.toFixed(0)}</td>
                    <td className="px-3 py-2 text-right">{m.cbAfter.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

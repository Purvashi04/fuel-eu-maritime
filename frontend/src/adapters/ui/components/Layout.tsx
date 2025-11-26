import React, { useState } from "react";
import { Tabs } from "./Tabs";
import { RoutesTab } from "./RoutesTab";
import { CompareTab } from "./CompareTab";
import { BankingTab } from "./BankingTab";
import { PoolingTab } from "./PoolingTab";

const TAB_LABELS = ["Routes", "Compare", "Banking", "Pooling"] as const;
type Tab = (typeof TAB_LABELS)[number];

export const Layout: React.FC = () => {
  const [active, setActive] = useState<Tab>("Routes");

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Fuel EU Maritime Compliance
          </h1>
          <p className="text-sm text-slate-400">
            Routes · Comparisons · Banking · Pooling
          </p>
        </div>
      </header>

      <Tabs tabs={TAB_LABELS} active={active} onChange={setActive} />

      <main className="mt-6 rounded-2xl bg-slate-900/60 p-4 shadow-lg ring-1 ring-slate-800">
        {active === "Routes" && <RoutesTab />}
        {active === "Compare" && <CompareTab />}
        {active === "Banking" && <BankingTab />}
        {active === "Pooling" && <PoolingTab />}
      </main>
    </div>
  );
};

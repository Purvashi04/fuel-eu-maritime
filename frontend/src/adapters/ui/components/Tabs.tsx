import React from "react";

interface Props<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (t: T) => void;
}

export function Tabs<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <div className="inline-flex rounded-full bg-slate-800/80 p-1 text-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-full transition ${
            tab === active
              ? "bg-sky-500 text-white shadow"
              : "text-slate-300 hover:text-white hover:bg-slate-700/80"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

import React from "react";

// Callout Box Component
export function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 md:p-6 rounded-lg border-l-4 border-[#3B82F6] bg-[#EFF6FF]">
      <div className="prose prose-invert max-w-none text-gray-800">
        {children}
      </div>
    </div>
  );
}

// Comparison Block Component (İyi/Kötü Örnek)
export function ComparisonBlock({
  bad,
  good,
}: {
  bad: React.ReactNode;
  good: React.ReactNode;
}) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 rounded-lg border-2 border-red-500 bg-[#FEF2F2]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-bold">❌</span>
          <span className="text-red-600 font-semibold">Kötü Örnek</span>
        </div>
        <div className="prose prose-invert max-w-none text-gray-800">{bad}</div>
      </div>
      <div className="p-4 rounded-lg border-2 border-green-500 bg-[#F0FDF4]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-600 font-bold">✅</span>
          <span className="text-green-600 font-semibold">İyi Örnek</span>
        </div>
        <div className="prose prose-invert max-w-none text-gray-800">{good}</div>
      </div>
    </div>
  );
}

// Step List Component
export function StepList({ steps }: { steps: Array<{ number: number; title: string; content: React.ReactNode }> }) {
  return (
    <div className="my-6 space-y-6">
      {steps.map((step) => (
        <div key={step.number} className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DEFF37] text-black flex items-center justify-center font-bold text-xl">
            {step.number}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
            <div className="prose prose-invert max-w-none text-gray-300">{step.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Info Card Component (Quick Fact)
export function InfoCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="my-6 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
      <div className="text-5xl font-bold text-[#DEFF37] mb-2">{number}</div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
}

// Tip Box Component
export function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 md:p-6 rounded-lg bg-amber-500/10 border border-amber-500/30">
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div className="flex-1 prose prose-invert max-w-none text-gray-300">{children}</div>
      </div>
    </div>
  );
}

// Warning Box Component
export function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 md:p-6 rounded-lg bg-orange-500/10 border border-orange-500/30">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1 prose prose-invert max-w-none text-gray-300">{children}</div>
      </div>
    </div>
  );
}

// Table Component
export function ContentTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-900">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-white font-semibold border border-zinc-800"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={rowIdx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/30"}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-4 py-3 text-gray-300 border border-zinc-800"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Quote Block Component
export function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 pl-6 border-l-4 border-gray-500 bg-zinc-900/30 italic text-gray-400">
      <div className="prose prose-invert max-w-none">{children}</div>
    </div>
  );
}

// Checklist Component (Yap/Yapma)
export function Checklist({
  doItems,
  dontItems,
}: {
  doItems: string[];
  dontItems: string[];
}) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-green-500">✓</span> Yap:
        </h4>
        <ul className="space-y-2">
          {doItems.map((item, idx) => (
            <li key={idx} className="text-gray-300 flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-red-500">✗</span> Yapma:
        </h4>
        <ul className="space-y-2">
          {dontItems.map((item, idx) => (
            <li key={idx} className="text-gray-300 flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Exercise Box Component
export function ExerciseBox({
  title,
  duration,
  children,
}: {
  title: string;
  duration?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 p-6 rounded-xl bg-purple-500/10 border-2 border-purple-500/30 relative">
      {duration && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
          {duration}
        </div>
      )}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">✏️</span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="prose prose-invert max-w-none text-gray-300">{children}</div>
    </div>
  );
}

// Summary Box Component
export function SummaryBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 rounded-xl bg-zinc-900/50 border-t-4 border-[#DEFF37]">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">📝</span>
        <h3 className="text-xl font-bold text-white">Özet</h3>
      </div>
      <div className="prose prose-invert max-w-none text-gray-300">{children}</div>
    </div>
  );
}

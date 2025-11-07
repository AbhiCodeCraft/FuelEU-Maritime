import { ReactNode, useState } from 'react';

export function Tabs({ tabs }: { tabs: { key: string; label: string; content: ReactNode; }[] }) {
  const [active, setActive] = useState(tabs[0].key);
  return (
    <div>
      <div className="flex gap-2 border-b">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={()=>setActive(t.key)}
            className={`px-3 py-2 ${active===t.key? 'border-b-2 border-blue-600 font-semibold':'text-gray-600'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs.find(t=>t.key===active)?.content}</div>
    </div>
  );
}

export function YearPicker({ year, setYear }: { year: number; setYear: (n:number)=>void }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Year</label>
      <input className="border rounded px-2 py-1" type="number" value={year} onChange={e=>setYear(Number(e.target.value))} />
    </div>
  );
}

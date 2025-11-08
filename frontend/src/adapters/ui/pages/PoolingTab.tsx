import { useState } from 'react';
import { Services } from '../../../core/ports/services';
import { Table } from '../components/Table';

export default function PoolingTab(){
  const [year, setYear] = useState<number>(2025);
  const [members, setMembers] = useState<{ shipId: string; cbBefore: number }[]>([
    { shipId: 'S1', cbBefore: 1000 },
    { shipId: 'S2', cbBefore: -600 },
    { shipId: 'S3', cbBefore: -400 }
  ]);
  const [result, setResult] = useState<any>(null);
  const sum = members.reduce((a,m)=>a+m.cbBefore,0);

  function update(idx: number, field: 'shipId'|'cbBefore', value: string){
    setMembers(ms => ms.map((m,i)=> i===idx? { ...m, [field]: field==='cbBefore'? Number(value): value }: m));
  }

  async function createPool(){
    try{
      const r = await Services.pool(year, members);
      setResult(r);
    }catch(e:any){ setResult({ error: String(e) }); }
  }

  const invalid = sum < 0;

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <label className="text-sm">Year</label>
        <input type="number" className="border rounded px-2 py-1" value={year} onChange={e=>setYear(Number(e.target.value))}/>
        <span className={`px-2 py-1 rounded text-sm ${invalid? 'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>Pool Sum: {sum.toFixed(2)}</span>
        <button className="px-2 py-1 rounded bg-gray-200" onClick={()=> setMembers(ms=> [...ms, { shipId: `S${ms.length+1}`, cbBefore: 0 }])}>Add Member</button>
      </div>
      <Table
        headers={["Ship","CB Before","Actions"]}
        rows={members.map((m,i)=>[
          <input key={`id-${i}`} className="border rounded px-2 py-1" value={m.shipId} onChange={e=>update(i,'shipId',e.target.value)} />,
          <input key={`cb-${i}`} type="number" className="border rounded px-2 py-1" value={m.cbBefore} onChange={e=>update(i,'cbBefore',e.target.value)} />,
          <button key={`rm-${i}`} className="px-2 py-1 rounded bg-gray-200" onClick={()=> setMembers(ms=> ms.filter((_,j)=> j!==i))}>Remove</button>
        ])}
      />
      <button className={`px-3 py-2 rounded text-white ${invalid? 'bg-gray-400':'bg-purple-600'}`} disabled={invalid} onClick={createPool}>Create Pool</button>

      {result && !result.error && (
        <div className="space-y-2">
          <div className="text-sm">Sum After: <b>{result.sumAfter.toFixed(2)}</b></div>
          <Table
            headers={["Ship","CB Before","CB After"]}
            rows={result.members.map((m:any)=>[m.shipId, m.cbBefore.toFixed(2), m.cbAfter.toFixed(2)])}
          />
        </div>
      )}
      {result?.error && <p className="text-red-600">{String(result.error)}</p>}
    </div>
  );
}

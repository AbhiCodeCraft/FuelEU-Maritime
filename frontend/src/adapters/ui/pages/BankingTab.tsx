import { useAsync } from '../../../core/application/hooks';
import { Services } from '../../infrastructure/api/ports';
import { useMemo, useState } from 'react';

export default function BankingTab(){
  const [year, setYear] = useState<number>(2025);
  const { data: cbSnap, loading: loadingCB, error: errorCB, setData: setCBSnap } = useAsync(() => Services.cb(year), [year]);
  const { data: records, loading: loadingRec, error: errorRec, setData: setRecords } = useAsync(() => Services.records(year), [year]);

  const disabled = useMemo(()=> (records?.cb_before ?? 0) <= 0, [records]);
  const [amount, setAmount] = useState<number>(0);
  const [msg, setMsg] = useState<string | null>(null);

  async function doBank(){
    try{
      await Services.bank(year, amount);
      setMsg(`Banked ${amount}`);
      setRecords(await Services.records(year) as any);
    }catch(e:any){ setMsg(e.message); }
  }

  async function doApply(){
    try{
      await Services.apply(year, amount);
      setMsg(`Applied ${amount}`);
    }catch(e:any){ setMsg(e.message); }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <label className="text-sm">Year</label>
        <input type="number" className="border rounded px-2 py-1" value={year} onChange={e=>setYear(Number(e.target.value))}/>
        <input type="number" placeholder="Amount" className="border rounded px-2 py-1" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      </div>
      {(loadingCB || loadingRec) && <p>Loading…</p>}
      {(errorCB || errorRec) && <p className="text-red-600">{errorCB || errorRec}</p>}
      {cbSnap && records && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded border">
            <div className="font-semibold">Compliance Balance</div>
            <div className="text-sm text-gray-600">cb_before: <b>{records.cb_before.toFixed(2)}</b></div>
            <div className="text-sm text-gray-600">available banked: <b>{records.available.toFixed(2)}</b></div>
          </div>
          <div className="flex gap-2 items-center">
            <button className={`px-3 py-2 rounded text-white ${disabled? 'bg-gray-400':'bg-blue-600'}`} disabled={disabled} onClick={doBank}>Bank Surplus</button>
            <button className="px-3 py-2 rounded text-white bg-green-600" onClick={doApply}>Apply Banked</button>
          </div>
        </div>
      )}
      {msg && <p className="text-sm">{msg}</p>}
    </div>
  );
}

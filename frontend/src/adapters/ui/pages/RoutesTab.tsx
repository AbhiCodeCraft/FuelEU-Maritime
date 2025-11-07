import { useState } from 'react';
import { Services } from '../../infrastructure/api/ports';
import { useAsync } from '../../../core/application/hooks';
import { Table } from '../components/Table';

export default function RoutesTab() {
  const [filters, setFilters] = useState<{vesselType?: string; fuelType?: string; year?: number}>({});
  const { data, loading, error, setData } = useAsync(() => Services.routes(filters), [JSON.stringify(filters)]);

  async function setBaseline(routeId: string){
    await Services.setBaseline(routeId);
    const refreshed = await Services.routes(filters);
    setData(refreshed as any);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input placeholder="VesselType" className="border rounded px-2 py-1" onChange={e=>setFilters(f=>({...f, vesselType:e.target.value||undefined}))} />
        <input placeholder="FuelType" className="border rounded px-2 py-1" onChange={e=>setFilters(f=>({...f, fuelType:e.target.value||undefined}))} />
        <input placeholder="Year" type="number" className="border rounded px-2 py-1" onChange={e=>setFilters(f=>({...f, year:e.target.value?Number(e.target.value):undefined}))} />
      </div>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <Table
          headers={["routeId","vesselType","fuelType","year","ghgIntensity","fuelConsumption (t)","distance (km)","totalEmissions (t)","baseline"]}
          rows={data.map(r=>[
            r.routeId,
            r.vesselType,
            r.fuelType,
            r.year,
            r.ghgIntensity.toFixed(2),
            r.fuelConsumption,
            r.distance,
            r.totalEmissions,
            <button key={r.routeId} onClick={()=>setBaseline(r.routeId)} className={`px-2 py-1 rounded ${r.isBaseline? 'bg-green-600 text-white':'bg-blue-600 text-white'}`}>{r.isBaseline? 'Baseline ✅':'Set Baseline'}</button>
          ])}
        />
      )}
    </div>
  );
}

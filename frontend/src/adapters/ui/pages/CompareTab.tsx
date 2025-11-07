import { useAsync } from '../../../core/application/hooks';
import { Services } from '../../infrastructure/api/ports';
import { Table } from '../components/Table';
import { GHGChart } from '../../infrastructure/charts/GHGChart';

export default function CompareTab(){
  const { data, loading, error } = useAsync(() => Services.comparison(), []);
  return (
    <div className="space-y-4">
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <>
          <div className="text-sm text-gray-700">
            Baseline route: <b>{data.baseline}</b> · Target: <b>{data.target.toFixed(4)} gCO₂e/MJ</b>
          </div>
          <Table
            headers={["Route","Baseline Intensity","Comparison Intensity","% difference","Compliant"]}
            rows={data.rows.map(r=>[
              r.routeId,
              r.baseline.toFixed(2),
              r.comparison.toFixed(2),
              `${r.percentDiff.toFixed(2)} %`,
              r.compliant? '✅':'❌'
            ])}
          />
          <GHGChart data={data.rows.map(r=>({ routeId: r.routeId, value: r.comparison }))} />
        </>
      )}
    </div>
  );
}

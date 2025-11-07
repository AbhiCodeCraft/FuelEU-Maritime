import { api } from '../../adapters/infrastructure/api/http';
import { RoutesResponse, ComparisonResponse, CBResponse, BankingRecords, PoolResult } from '../../adapters/infrastructure/api/ports';

export const Services = {
  routes: (filters?: { vesselType?: string; fuelType?: string; year?: number }) => {
    const q = new URLSearchParams();
    if (filters?.vesselType) q.set('vesselType', filters.vesselType);
    if (filters?.fuelType) q.set('fuelType', filters.fuelType);
    if (filters?.year) q.set('year', String(filters.year));
    return api<RoutesResponse>(`/routes${q.toString() ? `?${q}`: ''}`);
  },
  setBaseline: (routeId: string) => api(`/routes/${routeId}/baseline`, { method: 'POST' }),
  comparison: () => api<ComparisonResponse>('/routes/comparison'),
  cb: (year: number, shipId = 'SHIP-1') => api<CBResponse>(`/compliance/cb?shipId=${shipId}&year=${year}`),
  records: (year: number, shipId = 'SHIP-1') => api<BankingRecords>(`/banking/records?shipId=${shipId}&year=${year}`),
  bank: (year: number, amount: number, shipId = 'SHIP-1') => api(`/banking/bank`, { method: 'POST', body: JSON.stringify({ shipId, year, amount }) }),
  apply: (year: number, amount: number, shipId = 'SHIP-1') => api(`/banking/apply`, { method: 'POST', body: JSON.stringify({ shipId, year, amount }) }),
  pool: (year: number, members: { shipId: string; cbBefore: number }[]) => api<PoolResult>(`/pools`, { method: 'POST', body: JSON.stringify({ year, members }) })
};

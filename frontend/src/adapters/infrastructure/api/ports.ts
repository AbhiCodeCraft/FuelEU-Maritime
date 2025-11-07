import { Route } from '../../../core/domain/models';

export type RoutesResponse = Route[];
export type ComparisonResponse = {
  baseline: string; target: number;
  rows: { routeId: string; baseline: number; comparison: number; percentDiff: number; compliant: boolean; }[]
};
export type CBResponse = { shipId: string; year: number; energyMJ: number; actual: number; target: number; cb: number };
export type BankingRecords = { shipId: string; year: number; cb_before: number; available: number };
export type PoolResult = { year: number; sumAfter: number; members: { shipId: string; cbBefore: number; cbAfter: number }[] };

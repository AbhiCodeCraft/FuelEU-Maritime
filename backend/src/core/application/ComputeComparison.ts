export function percentDiff(comparison: number, baseline: number) {
  return ((comparison / baseline) - 1) * 100;
}
export function compliant(actual: number, target: number) {
  return actual <= target;
}

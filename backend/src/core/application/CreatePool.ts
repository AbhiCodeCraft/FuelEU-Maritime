import { PoolMemberDraft, PoolResult, PoolResultMember } from "../domain/Pooling";

export function validatePool(members: PoolMemberDraft[]): { ok: boolean; sum: number; reason?: string } {
  const sum = members.reduce((a, m) => a + m.cbBefore, 0);
  if (sum < 0) return { ok: false, sum, reason: "Sum(adjustedCB) must be ≥ 0" };
  return { ok: true, sum };
}

export function greedyAllocate(year: number, members: PoolMemberDraft[]): PoolResult {
  const surplus = members.filter(m => m.cbBefore > 0).sort((a,b)=> b.cbBefore - a.cbBefore);
  const deficits = members.filter(m => m.cbBefore < 0).sort((a,b)=> a.cbBefore - b.cbBefore);

  const after = new Map<string, number>(members.map(m => [m.shipId, m.cbBefore]));

  for (const s of surplus) {
    let available = after.get(s.shipId)!;
    for (const d of deficits) {
      const dVal = after.get(d.shipId)!;
      if (dVal >= 0) continue;
      const transfer = Math.min(available, -dVal);
      if (transfer <= 0) break;
      after.set(s.shipId, available - transfer);
      after.set(d.shipId, dVal + transfer);
      available -= transfer;
      if (available <= 0) break;
    }
  }

  const resultMembers: PoolResultMember[] = members.map(m => {
    const cbAfter = after.get(m.shipId)!;
    if (m.cbBefore < 0 && cbAfter < m.cbBefore) throw new Error("Deficit ship exited worse");
    if (m.cbBefore > 0 && cbAfter < 0) throw new Error("Surplus ship exited negative");
    return { shipId: m.shipId, cbBefore: m.cbBefore, cbAfter };
  });

  const sumAfter = resultMembers.reduce((a, m) => a + m.cbAfter, 0);
  return { year, members: resultMembers, sumAfter };
}

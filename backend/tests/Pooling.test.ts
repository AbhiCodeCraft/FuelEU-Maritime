import { describe, it, expect } from "vitest";
import { greedyAllocate, validatePool } from "../src/core/application/CreatePool";

describe("Pooling", () => {
  it("validates sum >= 0", () => {
    expect(validatePool([{shipId:"A", cbBefore:-10},{shipId:"B", cbBefore:9}]).ok).toBe(false);
  });
  it("allocates without breaking rules", () => {
    const r = greedyAllocate(2025, [
      { shipId: "S1", cbBefore: 100 },
      { shipId: "S2", cbBefore: -40 },
      { shipId: "S3", cbBefore: -60 }
    ]);
    expect(r.sumAfter).toBe(0);
    expect(r.members.find(m=>m.shipId==="S1")!.cbAfter).toBe(0);
  });
});

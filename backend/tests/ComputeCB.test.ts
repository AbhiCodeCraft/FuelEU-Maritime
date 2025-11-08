import { describe, it, expect } from "vitest";
import { computeCB } from "../src/core/application/ComputeCB";

describe("CB", () => {
  it("positive when actual < target", () => {
    const cb = computeCB(88, 1_000_000, 89.3368);
    expect(cb).toBeGreaterThan(0);
  });
});

import { describe, it, expect } from "vitest";
import { percentDiff } from "../src/core/application/ComputeComparison";

describe("Compare", () => {
  it("percentDiff", () => {
    expect(percentDiff(90, 100)).toBeCloseTo(-10);
  });
});

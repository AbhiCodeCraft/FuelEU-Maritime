import { describe, it, expect } from "vitest";
import { applyBank } from "../src/core/application/ApplyBanked";

describe("Banking", () => {
  it("rejects over-apply", () => {
    expect(()=>applyBank(100, 101)).toThrow();
  });
});

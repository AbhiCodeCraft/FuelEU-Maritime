import { Router } from "express";
import { PrismaBankingRepo } from "../../outbound/prisma/PrismaBankingRepo";
import { applyBank, canBank } from "../../../core/application/BankSurplus";

export const bankingRouter = Router();

bankingRouter.get("/banking/records", async (req, res) => {
  const { shipId = "SHIP-1", year } = req.query as any;
  if (!year) return res.status(400).json({ error: "year required" });
  const y = Number(year);
  const cb = await PrismaBankingRepo.getCB(String(shipId), y);
  const available = await PrismaBankingRepo.availableBanked(String(shipId));
  res.json({ shipId, year: y, cb_before: cb ?? 0, available });
});

bankingRouter.post("/banking/bank", async (req, res) => {
  const { shipId = "SHIP-1", year, amount } = req.body ?? {};
  if (!year || amount == null) return res.status(400).json({ error: "year and amount required" });
  const y = Number(year);
  const cb = await PrismaBankingRepo.getCB(String(shipId), y);
  if (!cb || !canBank(cb)) return res.status(400).json({ error: "CB ≤ 0, cannot bank" });
  const amt = Number(amount);
  if (amt <= 0 || amt > cb) return res.status(400).json({ error: "Invalid amount" });
  await PrismaBankingRepo.bank(String(shipId), y, amt);
  res.json({ ok: true, banked: amt });
});

bankingRouter.post("/banking/apply", async (req, res) => {
  const { shipId = "SHIP-1", year, amount } = req.body ?? {};
  if (!year || amount == null) return res.status(400).json({ error: "year and amount required" });
  const available = await PrismaBankingRepo.availableBanked(String(shipId));
  try {
    const approved = applyBank(available, Number(amount));
    // NOTE: In a fuller impl, persist an application record and decrement availability.
    res.json({ ok: true, applied: approved });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

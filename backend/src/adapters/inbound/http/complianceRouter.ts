import { Router } from "express";
import { PrismaRouteRepo } from "../../outbound/prisma/PrismaRouteRepo";
import { PrismaBankingRepo } from "../../outbound/prisma/PrismaBankingRepo";
import { computeCB, computeEnergyMJ } from "../../../core/application/ComputeCB";
import { TARGET_2025 } from "../../../shared/constants";

export const complianceRouter = Router();

complianceRouter.get("/compliance/cb", async (req, res) => {
  const { shipId = "SHIP-1", year } = req.query as any;
  if (!year) return res.status(400).json({ error: "year required" });
  const y = Number(year);
  const routes = await PrismaRouteRepo.getAll({ year: y });
  const energy = routes.reduce((a, r) => a + computeEnergyMJ(r), 0);
  const avgIntensity = routes.length
    ? routes.reduce((a, r) => a + r.ghgIntensity, 0) / routes.length
    : TARGET_2025;
  const cb = computeCB(avgIntensity, energy);
  await PrismaBankingRepo.saveCB(String(shipId), y, cb);
  res.json({ shipId, year: y, energyMJ: energy, actual: avgIntensity, target: TARGET_2025, cb });
});

complianceRouter.get("/compliance/adjusted-cb", async (req, res) => {
  const { shipId = "SHIP-1", year } = req.query as any;
  if (!year) return res.status(400).json({ error: "year required" });
  const y = Number(year);
  const cb = await PrismaBankingRepo.getCB(String(shipId), y);
  res.json({ shipId, year: y, adjustedCB: cb ?? 0 });
});

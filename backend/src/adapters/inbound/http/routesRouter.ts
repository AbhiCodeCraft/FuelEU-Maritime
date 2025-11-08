import { Router } from "express";
import { PrismaRouteRepo } from "../../outbound/prisma/PrismaRouteRepo";
import { percentDiff, compliant } from "../../../core/application/ComputeComparison";
import { TARGET_2025 } from "../../../shared/constants";

export const routesRouter = Router();

routesRouter.get("/routes", async (req, res) => {
  const { vesselType, fuelType, year } = req.query as any;
  const routes = await PrismaRouteRepo.getAll({
    vesselType: vesselType || undefined,
    fuelType: fuelType || undefined,
    year: year ? Number(year) : undefined
  });
  res.json(routes);
});

routesRouter.post("/routes/:routeId/baseline", async (req, res) => {
  await PrismaRouteRepo.setBaseline(req.params.routeId);
  res.json({ ok: true });
});

routesRouter.get("/routes/comparison", async (_req, res) => {
  const baseline = await PrismaRouteRepo.getBaseline();
  if (!baseline) return res.status(400).json({ error: "No baseline set" });
  const all = await PrismaRouteRepo.getAll();
  const others = all.filter(r => r.routeId !== baseline.routeId);
  const rows = others.map(r => ({
    routeId: r.routeId,
    baseline: baseline.ghgIntensity,
    comparison: r.ghgIntensity,
    percentDiff: percentDiff(r.ghgIntensity, baseline.ghgIntensity),
    compliant: compliant(r.ghgIntensity, TARGET_2025)
  }));
  res.json({ baseline: baseline.routeId, target: TARGET_2025, rows });
});

import { Router } from "express";
import { validatePool, greedyAllocate } from "../../../core/application/CreatePool";
import { PrismaPoolRepo } from "../../outbound/prisma/PrismaPoolRepo";

export const poolsRouter = Router();

poolsRouter.post("/pools", async (req, res) => {
  const { year, members } = req.body ?? {};
  if (!year || !Array.isArray(members)) return res.status(400).json({ error: "year and members[] required" });
  const v = validatePool(members);
  if (!v.ok) return res.status(400).json({ error: v.reason });
  try {
    const result = greedyAllocate(Number(year), members);
    await PrismaPoolRepo.create(Number(year), result);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

import { prisma } from "../../../infrastructure/db/client";
import { BankingRepo } from "../../../core/ports/BankingRepo";

export const PrismaBankingRepo: BankingRepo = {
  async getCB(shipId, year) {
    const r = await prisma.shipCompliance.findUnique({ where: { shipId_year: { shipId, year } } });
    return r?.cbGCO2eq ?? null;
  },
  async saveCB(shipId, year, cb) {
    await prisma.shipCompliance.upsert({
      where: { shipId_year: { shipId, year } },
      update: { cbGCO2eq: cb },
      create: { shipId, year, cbGCO2eq: cb }
    });
  },
  async bank(shipId, year, amount) {
    await prisma.bankEntry.create({ data: { shipId, year, amountGCO2eq: amount } });
  },
  async appliedTotal(_shipId, _year) {
    return 0; // starter keeps it simple
  },
  async availableBanked(shipId) {
    const agg = await prisma.bankEntry.aggregate({
      _sum: { amountGCO2eq: true },
      where: { shipId }
    });
    return agg._sum.amountGCO2eq ?? 0;
  }
};

import { prisma } from "../../../infrastructure/db/client";
import { PoolRepo } from "../../../core/ports/PoolRepo";
import { PoolResult } from "../../../core/domain/Pooling";

export const PrismaPoolRepo: PoolRepo = {
  async create(year, result: PoolResult) {
    await prisma.pool.create({
      data: {
        year,
        members: {
          create: result.members.map(m => ({
            shipId: m.shipId,
            cbBefore: m.cbBefore,
            cbAfter: m.cbAfter
          }))
        }
      }
    });
  }
};

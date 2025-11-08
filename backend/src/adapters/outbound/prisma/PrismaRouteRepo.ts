import { prisma } from "../../../infrastructure/db/client";
import { RouteRepo } from "../../../core/ports/RouteRepo";
import { RouteEntity } from "../../../core/domain/Route";

export const PrismaRouteRepo: RouteRepo = {
  async getAll(filters) {
    const where: any = {};
    if (filters?.vesselType) where.vesselType = filters.vesselType;
    if (filters?.fuelType) where.fuelType = filters.fuelType;
    if (filters?.year) where.year = filters.year;
    const routes = await prisma.route.findMany({ where, orderBy: { routeId: "asc" } });
    return routes as unknown as RouteEntity[];
  },
  async setBaseline(routeId) {
    await prisma.$transaction([
      prisma.route.updateMany({ data: { isBaseline: false }, where: {} }),
      prisma.route.update({ where: { routeId }, data: { isBaseline: true } })
    ]);
  },
  async getBaseline() {
    const r = await prisma.route.findFirst({ where: { isBaseline: true } });
    return r as any;
  }
};

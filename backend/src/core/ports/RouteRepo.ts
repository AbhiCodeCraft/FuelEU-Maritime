import { RouteEntity } from "../domain/Route";

export interface RouteRepo {
  getAll(filters?: Partial<Pick<RouteEntity,"vesselType"|"fuelType"|"year">>): Promise<RouteEntity[]>;
  setBaseline(routeId: string): Promise<void>;
  getBaseline(): Promise<RouteEntity | null>;
}

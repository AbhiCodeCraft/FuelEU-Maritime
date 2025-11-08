import { TARGET_2025, MJ_PER_TONNE } from "../../shared/constants";
import { RouteEntity } from "../domain/Route";

export function computeEnergyMJ(route: Pick<RouteEntity, "fuelConsumption">) {
  return route.fuelConsumption * MJ_PER_TONNE;
}

export function computeCB(actualIntensity: number, energyMJ: number, target = TARGET_2025) {
  return (target - actualIntensity) * energyMJ;
}

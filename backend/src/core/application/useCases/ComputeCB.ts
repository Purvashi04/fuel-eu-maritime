import { Route } from "../../domain/Route";
import { ENERGY_PER_TONNE, TARGET_INTENSITY_2025 } from "../../../shared/constants";

export function computeComplianceBalance(route: Route): number {
  const energyInScope = route.fuelConsumptionTonnes * ENERGY_PER_TONNE;
  const target = TARGET_INTENSITY_2025;
  const actual = route.ghgIntensity;
  const cb = (target - actual) * energyInScope;
  return cb;
}

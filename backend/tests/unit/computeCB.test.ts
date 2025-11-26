import { computeComplianceBalance } from "../../src/core/application/useCases/ComputeCB";
import { Route } from "../../src/core/domain/Route";
import { TARGET_INTENSITY_2025 } from "../../src/shared/constants";

test("computeComplianceBalance positive for better-than-target", () => {
  const route: Route = {
    id: 1,
    routeId: "R002",
    vesselType: "BulkCarrier",
    fuelType: "LNG",
    year: 2024,
    ghgIntensity: TARGET_INTENSITY_2025 - 1,
    fuelConsumptionTonnes: 1000,
    distanceKm: 1000,
    totalEmissionsTonnes: 900,
    isBaseline: false
  };
  const cb = computeComplianceBalance(route);
  expect(cb).toBeGreaterThan(0);
});

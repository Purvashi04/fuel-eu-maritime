export interface Route {
  id: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumptionTonnes: number;
  distanceKm: number;
  totalEmissionsTonnes: number;
  isBaseline: boolean;
}

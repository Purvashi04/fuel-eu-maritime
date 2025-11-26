import { RouteRepositoryPort } from "../../ports/RouteRepositoryPort";

export interface ComparisonResult {
  routeId: string;
  baselineGhg: number;
  comparisonGhg: number;
  percentDiff: number;
  compliant: boolean;
}

export class GetComparison {
  constructor(private readonly routeRepo: RouteRepositoryPort) {}

  async execute(): Promise<ComparisonResult[]> {
    const { baseline, others } = await this.routeRepo.getComparisonRoutes();
    return others.map((route) => {
      const percentDiff = ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
      return {
        routeId: route.routeId,
        baselineGhg: baseline.ghgIntensity,
        comparisonGhg: route.ghgIntensity,
        percentDiff,
        compliant: percentDiff <= 0
      };
    });
  }
}

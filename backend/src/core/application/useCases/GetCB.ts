import { RouteRepositoryPort } from "../../ports/RouteRepositoryPort";
import { ComplianceRepositoryPort } from "../../ports/ComplianceRepositoryPort";
import { computeComplianceBalance } from "./ComputeCB";

export class GetCB {
  constructor(
    private readonly routeRepo: RouteRepositoryPort,
    private readonly complianceRepo: ComplianceRepositoryPort
  ) {}

  async execute(shipId: string, year: number) {
    const routes = await this.routeRepo.getAllRoutes();
    const route = routes.find((r) => r.year === year);
    if (!route) {
      throw new Error("No route found for year");
    }
    const cb = computeComplianceBalance(route);
    const stored = await this.complianceRepo.upsertCB(shipId, year, cb);
    return stored;
  }
}

import { RouteRepositoryPort } from "../../ports/RouteRepositoryPort";
import { Route } from "../../domain/Route";

export class GetRoutes {
  constructor(private readonly routeRepo: RouteRepositoryPort) {}

  async execute(): Promise<Route[]> {
    return this.routeRepo.getAllRoutes();
  }
}

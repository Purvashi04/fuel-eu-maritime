import { Route } from "../domain/Route";

export interface RouteRepositoryPort {
  getAllRoutes(): Promise<Route[]>;
  setBaseline(routeId: number): Promise<void>;
  getBaselineRoute(): Promise<Route | null>;
  getComparisonRoutes(): Promise<{ baseline: Route; others: Route[] }>;
}

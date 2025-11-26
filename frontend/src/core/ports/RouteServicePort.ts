import { Route } from "../domain/route";
import { ComparisonRow } from "../domain/compliance";

export interface RouteServicePort {
  fetchRoutes(): Promise<Route[]>;
  setBaseline(routeId: number): Promise<void>;
  fetchComparison(): Promise<ComparisonRow[]>;
}

import { RouteServicePort } from "../../../core/ports/RouteServicePort";
import { Route } from "../../../core/domain/route";
import { ComparisonRow } from "../../../core/domain/compliance";
import { http } from "./httpClient";

export class RouteServiceHttp implements RouteServicePort {
  async fetchRoutes(): Promise<Route[]> {
    const res = await http.get<Route[]>("/routes");
    return res.data;
  }

  async setBaseline(routeId: number): Promise<void> {
    await http.post(`/routes/${routeId}/baseline`);
  }

  async fetchComparison(): Promise<ComparisonRow[]> {
    const res = await http.get<ComparisonRow[]>("/routes/comparison");
    return res.data;
  }
}

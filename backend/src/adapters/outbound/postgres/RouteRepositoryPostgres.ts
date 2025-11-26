import { RouteRepositoryPort } from "../../../core/ports/RouteRepositoryPort";
import { Route } from "../../../core/domain/Route";
import { dbPool } from "../../../infrastructure/db/db";

export class RouteRepositoryPostgres implements RouteRepositoryPort {
  async getAllRoutes(): Promise<Route[]> {
    const res = await dbPool.query("SELECT * FROM routes ORDER BY id");
    return res.rows.map(this.mapRow);
  }

  async setBaseline(id: number): Promise<void> {
    const client = await dbPool.connect();
    try {
      await client.query("BEGIN");
      await client.query("UPDATE routes SET is_baseline = FALSE");
      await client.query("UPDATE routes SET is_baseline = TRUE WHERE id = $1", [id]);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async getBaselineRoute(): Promise<Route | null> {
    const res = await dbPool.query("SELECT * FROM routes WHERE is_baseline = TRUE LIMIT 1");
    if (res.rows.length === 0) return null;
    return this.mapRow(res.rows[0]);
  }

  async getComparisonRoutes(): Promise<{ baseline: Route; others: Route[] }> {
    const baseline = await this.getBaselineRoute();
    if (!baseline) {
      throw new Error("No baseline route set");
    }
    const res = await dbPool.query("SELECT * FROM routes WHERE id <> $1", [baseline.id]);
    const others = res.rows.map(this.mapRow);
    return { baseline, others };
  }

  private mapRow(row: any): Route {
    return {
      id: row.id,
      routeId: row.route_id,
      vesselType: row.vessel_type,
      fuelType: row.fuel_type,
      year: Number(row.year),
      ghgIntensity: Number(row.ghg_intensity),
      fuelConsumptionTonnes: Number(row.fuel_consumption_t),
      distanceKm: Number(row.distance_km),
      totalEmissionsTonnes: Number(row.total_emissions_t),
      isBaseline: row.is_baseline
    };
  }
}

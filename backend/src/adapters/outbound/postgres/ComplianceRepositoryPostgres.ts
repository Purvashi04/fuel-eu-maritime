import { ComplianceRepositoryPort } from "../../../core/ports/ComplianceRepositoryPort";
import { AdjustedCB, ShipCompliance } from "../../../core/domain/Compliance";
import { dbPool } from "../../../infrastructure/db/db";

export class ComplianceRepositoryPostgres implements ComplianceRepositoryPort {
  async upsertCB(shipId: string, year: number, cb: number): Promise<ShipCompliance> {
    const res = await dbPool.query(
      `INSERT INTO ship_compliance (ship_id, year, cb_gco2eq)
       VALUES ($1, $2, $3)
       ON CONFLICT (ship_id, year) DO UPDATE SET cb_gco2eq = EXCLUDED.cb_gco2eq
       RETURNING *`,
      [shipId, year, cb]
    );
    return this.mapRow(res.rows[0]);
  }

  async getCB(shipId: string, year: number): Promise<ShipCompliance | null> {
    const res = await dbPool.query(
      "SELECT * FROM ship_compliance WHERE ship_id = $1 AND year = $2 LIMIT 1",
      [shipId, year]
    );
    if (res.rows.length === 0) return null;
    return this.mapRow(res.rows[0]);
  }

  async getAdjustedCBForYear(year: number): Promise<AdjustedCB[]> {
    const res = await dbPool.query(
      "SELECT ship_id, year, cb_gco2eq FROM ship_compliance WHERE year = $1",
      [year]
    );
    return res.rows.map((r) => ({
      shipId: r.ship_id,
      year: Number(r.year),
      cbBefore: Number(r.cb_gco2eq),
      cbAfter: Number(r.cb_gco2eq)
    }));
  }

  private mapRow(row: any): ShipCompliance {
    return {
      id: row.id,
      shipId: row.ship_id,
      year: Number(row.year),
      cbGco2eq: Number(row.cb_gco2eq)
    };
  }
}

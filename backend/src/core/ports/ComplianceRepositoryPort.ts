import { ShipCompliance, AdjustedCB } from "../domain/Compliance";

export interface ComplianceRepositoryPort {
  upsertCB(shipId: string, year: number, cb: number): Promise<ShipCompliance>;
  getCB(shipId: string, year: number): Promise<ShipCompliance | null>;
  getAdjustedCBForYear(year: number): Promise<AdjustedCB[]>;
}

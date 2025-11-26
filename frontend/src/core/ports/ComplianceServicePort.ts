import { CBRecord } from "../domain/banking";

export interface ComplianceServicePort {
  fetchCB(shipId: string, year: number): Promise<CBRecord>;
}

import { ComplianceServicePort } from "../../../core/ports/ComplianceServicePort";
import { CBRecord } from "../../../core/domain/banking";
import { http } from "./httpClient";

export class ComplianceServiceHttp implements ComplianceServicePort {
  async fetchCB(shipId: string, year: number): Promise<CBRecord> {
    const res = await http.get<CBRecord>("/compliance/cb", {
      params: { shipId, year }
    });
    return res.data;
  }
}

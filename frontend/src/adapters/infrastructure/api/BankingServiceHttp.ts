import { BankingServicePort } from "../../../core/ports/BankingServicePort";
import { BankEntry, BankingKPI } from "../../../core/domain/banking";
import { http } from "./httpClient";

export class BankingServiceHttp implements BankingServicePort {
  async fetchBankEntries(shipId: string, year: number): Promise<BankEntry[]> {
    const res = await http.get<BankEntry[]>("/banking/records", {
      params: { shipId, year }
    });
    return res.data;
  }

  async bankSurplus(shipId: string, year: number): Promise<BankEntry> {
    const res = await http.post<BankEntry>("/banking/bank", { shipId, year });
    return res.data;
  }

  async applyBanked(shipId: string, year: number, amount: number): Promise<BankingKPI> {
    const res = await http.post<BankingKPI>("/banking/apply", { shipId, year, amount });
    return res.data;
  }
}

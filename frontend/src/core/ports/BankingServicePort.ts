import { BankEntry, BankingKPI } from "../domain/banking";

export interface BankingServicePort {
  fetchBankEntries(shipId: string, year: number): Promise<BankEntry[]>;
  bankSurplus(shipId: string, year: number): Promise<BankEntry>;
  applyBanked(shipId: string, year: number, amount: number): Promise<BankingKPI>;
}

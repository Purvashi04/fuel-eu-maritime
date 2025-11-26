import { BankEntry } from "../domain/Banking";

export interface BankingRepositoryPort {
  getBankedAmount(shipId: string, year: number): Promise<number>;
  createBankEntry(shipId: string, year: number, amount: number): Promise<BankEntry>;
  getBankEntries(shipId: string, year: number): Promise<BankEntry[]>;
  applyBankedAmount(shipId: string, year: number, amount: number): Promise<void>;
}

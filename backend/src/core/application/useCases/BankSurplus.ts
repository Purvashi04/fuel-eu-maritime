import { BankingRepositoryPort } from "../../ports/BankingRepositoryPort";
import { ComplianceRepositoryPort } from "../../ports/ComplianceRepositoryPort";

export class BankSurplus {
  constructor(
    private readonly bankingRepo: BankingRepositoryPort,
    private readonly complianceRepo: ComplianceRepositoryPort
  ) {}

  async execute(shipId: string, year: number) {
    const cbRecord = await this.complianceRepo.getCB(shipId, year);
    if (!cbRecord || cbRecord.cbGco2eq <= 0) {
      throw new Error("No positive CB to bank");
    }
    const entry = await this.bankingRepo.createBankEntry(shipId, year, cbRecord.cbGco2eq);
    return entry;
  }
}

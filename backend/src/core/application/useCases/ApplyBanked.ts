import { BankingRepositoryPort } from "../../ports/BankingRepositoryPort";
import { ComplianceRepositoryPort } from "../../ports/ComplianceRepositoryPort";

export class ApplyBanked {
  constructor(
    private readonly bankingRepo: BankingRepositoryPort,
    private readonly complianceRepo: ComplianceRepositoryPort
  ) {}

  async execute(shipId: string, year: number, amount: number) {
    const available = await this.bankingRepo.getBankedAmount(shipId, year);
    if (amount > available) {
      throw new Error("Cannot apply more than banked amount");
    }
    const cbRecord = await this.complianceRepo.getCB(shipId, year);
    if (!cbRecord) {
      throw new Error("No CB record found");
    }

    const cbBefore = cbRecord.cbGco2eq;
    const cbAfter = cbBefore + amount;

    await this.bankingRepo.applyBankedAmount(shipId, year, amount);
    await this.complianceRepo.upsertCB(shipId, year, cbAfter);

    return { cb_before: cbBefore, applied: amount, cb_after: cbAfter };
  }
}

import { ComplianceRepositoryPort } from "../../ports/ComplianceRepositoryPort";

export class GetAdjustedCB {
  constructor(private readonly complianceRepo: ComplianceRepositoryPort) {}

  async execute(year: number) {
    return this.complianceRepo.getAdjustedCBForYear(year);
  }
}

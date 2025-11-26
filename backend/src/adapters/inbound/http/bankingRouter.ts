import { Router } from "express";
import { BankingRepositoryPostgres } from "../../outbound/postgres/BankingRepositoryPostgres";
import { ComplianceRepositoryPostgres } from "../../outbound/postgres/ComplianceRepositoryPostgres";
import { BankSurplus } from "../../../core/application/useCases/BankSurplus";
import { ApplyBanked } from "../../../core/application/useCases/ApplyBanked";

const bankingRepo = new BankingRepositoryPostgres();
const complianceRepo = new ComplianceRepositoryPostgres();
const bankSurplusUC = new BankSurplus(bankingRepo, complianceRepo);
const applyBankedUC = new ApplyBanked(bankingRepo, complianceRepo);

export const bankingRouter = Router();

bankingRouter.get("/records", async (req, res, next) => {
  try {
    const shipId = (req.query.shipId as string) ?? "SHIP-001";
    const year = Number(req.query.year);
    const entries = await bankingRepo.getBankEntries(shipId, year);
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

bankingRouter.post("/bank", async (req, res) => {
  try {
    const { shipId, year } = req.body;
    const entry = await bankSurplusUC.execute(shipId, year);
    res.json(entry);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

bankingRouter.post("/apply", async (req, res) => {
  try {
    const { shipId, year, amount } = req.body;
    const kpis = await applyBankedUC.execute(shipId, year, amount);
    res.json(kpis);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

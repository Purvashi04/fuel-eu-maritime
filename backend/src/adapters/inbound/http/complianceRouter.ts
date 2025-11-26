import { Router } from "express";
import { RouteRepositoryPostgres } from "../../outbound/postgres/RouteRepositoryPostgres";
import { ComplianceRepositoryPostgres } from "../../outbound/postgres/ComplianceRepositoryPostgres";
import { GetCB } from "../../../core/application/useCases/GetCB";
import { GetAdjustedCB } from "../../../core/application/useCases/GetAdjustedCB";

const routeRepo = new RouteRepositoryPostgres();
const complianceRepo = new ComplianceRepositoryPostgres();
const getCBUC = new GetCB(routeRepo, complianceRepo);
const getAdjustedCBUC = new GetAdjustedCB(complianceRepo);

export const complianceRouter = Router();

complianceRouter.get("/cb", async (req, res, next) => {
  try {
    const shipId = (req.query.shipId as string) ?? "SHIP-001";
    const year = Number(req.query.year);
    const result = await getCBUC.execute(shipId, year);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

complianceRouter.get("/adjusted-cb", async (req, res, next) => {
  try {
    const year = Number(req.query.year);
    const result = await getAdjustedCBUC.execute(year);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

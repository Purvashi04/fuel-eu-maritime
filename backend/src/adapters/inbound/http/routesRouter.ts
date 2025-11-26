import { Router } from "express";
import { RouteRepositoryPostgres } from "../../outbound/postgres/RouteRepositoryPostgres";
import { GetRoutes } from "../../../core/application/useCases/GetRoutes";
import { SetBaseline } from "../../../core/application/useCases/SetBaseline";
import { GetComparison } from "../../../core/application/useCases/GetComparison";

const routeRepo = new RouteRepositoryPostgres();
const getRoutesUC = new GetRoutes(routeRepo);
const setBaselineUC = new SetBaseline(routeRepo);
const getComparisonUC = new GetComparison(routeRepo);

export const routesRouter = Router();

routesRouter.get("/", async (_req, res, next) => {
  try {
    const routes = await getRoutesUC.execute();
    res.json(routes);
  } catch (err) {
    next(err);
  }
});

routesRouter.post("/:id/baseline", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await setBaselineUC.execute(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

routesRouter.get("/comparison", async (_req, res, next) => {
  try {
    const comparison = await getComparisonUC.execute();
    res.json(comparison);
  } catch (err) {
    next(err);
  }
});

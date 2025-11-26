import { Router } from "express";
import { PoolRepositoryPostgres } from "../../outbound/postgres/PoolRepositoryPostgres";
import { CreatePool } from "../../../core/application/useCases/CreatePool";

const poolRepo = new PoolRepositoryPostgres();
const createPoolUC = new CreatePool(poolRepo);

export const poolsRouter = Router();

poolsRouter.post("/", async (req, res) => {
  try {
    const { year, members } = req.body;
    const result = await createPoolUC.execute(year, members);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

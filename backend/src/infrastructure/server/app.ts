import express from "express";
import cors from "cors";
import { routesRouter } from "../../adapters/inbound/http/routesRouter";
import { complianceRouter } from "../../adapters/inbound/http/complianceRouter";
import { bankingRouter } from "../../adapters/inbound/http/bankingRouter";
import { poolsRouter } from "../../adapters/inbound/http/poolsRouter";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/routes", routesRouter);
app.use("/compliance", complianceRouter);
app.use("/banking", bankingRouter);
app.use("/pools", poolsRouter);

app.use(
  // basic error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
);

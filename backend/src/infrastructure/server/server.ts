import express from "express";
import cors from "cors";
import { routesRouter } from "../../adapters/inbound/http/routesRouter";
import { complianceRouter } from "../../adapters/inbound/http/complianceRouter";
import { bankingRouter } from "../../adapters/inbound/http/bankingRouter";
import { poolsRouter } from "../../adapters/inbound/http/poolsRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use(routesRouter);
app.use(complianceRouter);
app.use(bankingRouter);
app.use(poolsRouter);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API ready on http://localhost:${port}`));

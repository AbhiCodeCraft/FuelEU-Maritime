import { PoolResult } from "../domain/Pooling";

export interface PoolRepo {
  create(year: number, result: PoolResult): Promise<void>;
}

import { Pool, PoolMember } from "../domain/Pooling";

export interface PoolRepositoryPort {
  createPool(year: number): Promise<Pool>;
  addMembers(poolId: number, members: PoolMember[]): Promise<void>;
}

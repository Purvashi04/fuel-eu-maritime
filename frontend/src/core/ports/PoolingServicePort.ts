import { PoolMember, PoolMemberInput } from "../domain/pooling";

export interface PoolingServicePort {
  createPool(year: number, members: PoolMemberInput[]): Promise<PoolMember[]>;
}

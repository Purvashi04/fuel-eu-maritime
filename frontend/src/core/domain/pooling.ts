export interface PoolMemberInput {
  shipId: string;
  cbBefore: number;
}

export interface PoolMember {
  poolId?: number;
  shipId: string;
  cbBefore: number;
  cbAfter: number;
}

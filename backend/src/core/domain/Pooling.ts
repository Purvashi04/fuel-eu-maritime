export interface Pool {
  id: number;
  year: number;
  createdAt: Date;
}

export interface PoolMember {
  poolId: number;
  shipId: string;
  cbBefore: number;
  cbAfter: number;
}

export interface PoolMemberInput {
  shipId: string;
  cbBefore: number;
}

import { PoolRepositoryPort } from "../../ports/PoolRepositoryPort";
import { PoolMemberInput, PoolMember } from "../../domain/Pooling";

export class CreatePool {
  constructor(private readonly poolRepo: PoolRepositoryPort) {}

  async execute(year: number, members: PoolMemberInput[]): Promise<PoolMember[]> {
    const sumCB = members.reduce((acc, m) => acc + m.cbBefore, 0);
    if (sumCB < 0) {
      throw new Error("Pool sum must be >= 0");
    }

    const surplus = members.filter((m) => m.cbBefore > 0);
    const deficits = members.filter((m) => m.cbBefore < 0);

    surplus.sort((a, b) => b.cbBefore - a.cbBefore);

    const cbAfterMap = new Map<string, number>();
    members.forEach((m) => cbAfterMap.set(m.shipId, m.cbBefore));

    let remainingSurplus = surplus.reduce((acc, s) => acc + s.cbBefore, 0);
    let remainingDeficit = Math.abs(deficits.reduce((acc, d) => acc + d.cbBefore, 0));

    for (const s of surplus) {
      if (remainingDeficit <= 0) break;
      const available = cbAfterMap.get(s.shipId)!;
      const transfer = Math.min(available, remainingDeficit);
      cbAfterMap.set(s.shipId, available - transfer);
      remainingSurplus -= transfer;
      remainingDeficit -= transfer;
    }

    const pool = await this.poolRepo.createPool(year);
    const membersPersist: PoolMember[] = members.map((m) => ({
      poolId: pool.id,
      shipId: m.shipId,
      cbBefore: m.cbBefore,
      cbAfter: cbAfterMap.get(m.shipId)!
    }));

    for (const m of membersPersist) {
      if (m.cbBefore < 0 && m.cbAfter < m.cbBefore) {
        throw new Error("Deficit ship exits worse");
      }
      if (m.cbBefore > 0 && m.cbAfter < 0) {
        throw new Error("Surplus ship exits negative");
      }
    }

    await this.poolRepo.addMembers(pool.id, membersPersist);
    return membersPersist;
  }
}

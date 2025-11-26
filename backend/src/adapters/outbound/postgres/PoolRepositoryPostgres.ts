import { PoolRepositoryPort } from "../../../core/ports/PoolRepositoryPort";
import { Pool, PoolMember } from "../../../core/domain/Pooling";
import { dbPool } from "../../../infrastructure/db/db";

export class PoolRepositoryPostgres implements PoolRepositoryPort {
  async createPool(year: number): Promise<Pool> {
    const res = await dbPool.query(
      "INSERT INTO pools (year) VALUES ($1) RETURNING *",
      [year]
    );
    return this.mapRow(res.rows[0]);
  }

  async addMembers(poolId: number, members: PoolMember[]): Promise<void> {
    const client = await dbPool.connect();
    try {
      await client.query("BEGIN");
      for (const m of members) {
        await client.query(
          "INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after) VALUES ($1, $2, $3, $4)",
          [poolId, m.shipId, m.cbBefore, m.cbAfter]
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  private mapRow(row: any): Pool {
    return {
      id: row.id,
      year: Number(row.year),
      createdAt: row.created_at
    };
  }
}

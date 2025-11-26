import { BankingRepositoryPort } from "../../../core/ports/BankingRepositoryPort";
import { BankEntry } from "../../../core/domain/Banking";
import { dbPool } from "../../../infrastructure/db/db";

export class BankingRepositoryPostgres implements BankingRepositoryPort {
  async getBankedAmount(shipId: string, year: number): Promise<number> {
    const res = await dbPool.query(
      "SELECT COALESCE(SUM(amount_gco2eq), 0) AS sum FROM bank_entries WHERE ship_id = $1 AND year = $2",
      [shipId, year]
    );
    return Number(res.rows[0].sum);
  }

  async createBankEntry(shipId: string, year: number, amount: number): Promise<BankEntry> {
    const res = await dbPool.query(
      "INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1, $2, $3) RETURNING *",
      [shipId, year, amount]
    );
    return this.mapRow(res.rows[0]);
  }

  async getBankEntries(shipId: string, year: number): Promise<BankEntry[]> {
    const res = await dbPool.query(
      "SELECT * FROM bank_entries WHERE ship_id = $1 AND year = $2 ORDER BY created_at",
      [shipId, year]
    );
    return res.rows.map(this.mapRow);
  }

  async applyBankedAmount(shipId: string, year: number, amount: number): Promise<void> {
    await dbPool.query(
      "INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1, $2, $3)",
      [shipId, year, -amount]
    );
  }

  private mapRow(row: any): BankEntry {
    return {
      id: row.id,
      shipId: row.ship_id,
      year: Number(row.year),
      amountGco2eq: Number(row.amount_gco2eq),
      createdAt: row.created_at
    };
  }
}

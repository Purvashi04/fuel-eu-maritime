export interface CBRecord {
  id: number;
  shipId: string;
  year: number;
  cbGco2eq: number;
}

export interface BankingKPI {
  cb_before: number;
  applied: number;
  cb_after: number;
}

export interface BankEntry {
  id: number;
  shipId: string;
  year: number;
  amountGco2eq: number;
  createdAt: string;
}

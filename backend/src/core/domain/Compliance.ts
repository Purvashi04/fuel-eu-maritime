export interface ShipCompliance {
  id: number;
  shipId: string;
  year: number;
  cbGco2eq: number;
}

export interface AdjustedCB {
  shipId: string;
  year: number;
  cbBefore: number;
  cbAfter: number;
}

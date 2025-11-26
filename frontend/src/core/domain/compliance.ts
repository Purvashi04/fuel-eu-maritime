export interface ComparisonRow {
  routeId: string;
  baselineGhg: number;
  comparisonGhg: number;
  percentDiff: number;
  compliant: boolean;
}

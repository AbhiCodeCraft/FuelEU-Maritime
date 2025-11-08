export interface BankingRepo {
  getCB(shipId: string, year: number): Promise<number | null>;
  saveCB(shipId: string, year: number, cb: number): Promise<void>;
  bank(shipId: string, year: number, amount: number): Promise<void>;
  appliedTotal(shipId: string, year: number): Promise<number>;
  availableBanked(shipId: string): Promise<number>;
}

export interface BaseTable {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
}

import { UnitType } from '../constants/unitTypes';

export type InventoryCategory =
  | 'All'
  | 'Groceries'
  | 'Beverages'
  | 'Dairy'
  | 'Bakery'
  | 'Snacks'
  | 'Household';

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: UnitType;
  price: number;
  costPrice?: number;
  category: string;
  sku?: string;
  minStockLevel?: number;
}

export interface InventorySummary {
  totalItems: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
}

import { UnitType } from '../constants/unitTypes';

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: UnitType;
}

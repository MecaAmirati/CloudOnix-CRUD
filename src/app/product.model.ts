export interface Product {
  id?: string;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile: {
    type: string;
    available: boolean;
    backlog?: number;
  };
}

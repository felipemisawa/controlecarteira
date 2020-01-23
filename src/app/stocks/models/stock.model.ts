export interface Stock {
  id: string;
  label: string;
  ticker: string;
  amount: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  currentProfit: number;
  monthlyYield: number;
}

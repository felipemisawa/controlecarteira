export interface Order {
  id: string;
  date: Date;
  ticker: string;
  type: string;
  amount: number;
  price: number;
  meanPrice: number;
  orderTotal: number;
  totalFees: number;
  remainingAmount: number;
  relatedOrders: Order[];
  profit: number;
  incomeTax: number;
  yield: number;
}

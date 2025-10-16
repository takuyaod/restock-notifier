export type StockCheckResult = {
  url: string;
  title?: string;
  isInStock: boolean;
  timestamp: Date;
  message?: string;
};

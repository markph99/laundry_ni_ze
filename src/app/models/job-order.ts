export interface JobOrder {
  slipNumber: string;
  customerName: string;  // Ensure this exists
  customerContact: string;
  payment: number;
  products: Array<{
    productName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }>;
  totalAmount: number;
  orderStatus: string;
  orderDate: Date;
}

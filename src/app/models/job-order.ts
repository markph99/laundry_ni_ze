export interface JobOrder {
  id?: number;
  slipNumber: string;
  address: string;
  phoneNumber: string;
  serviceType: string;
  pickupDate: string;
  pickupTime: string;
  bill: number | null;
  advancePayment: number | null;
  additionalInstructions: string;
  createdAt: string;
  balance?: number;
}

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
  balance?: number; // Add this property
  change?: number; // Add this property
  additionalInstructions: string;
  createdAt: string;
  formattedPickupTime?: string;
  status?: string;
}

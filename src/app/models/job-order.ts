export interface JobOrder {
change: string|number;
  id?: number;
  slipNumber: string;
  clothingType: string;
  kilograms: number | null;
  pickupDate: string;
  pickupTime: string;
  bill: number | null;
  advancePayment: number | null;
  balance?: number | null;
  additionalInstructions: string;
  createdAt: string;
  formattedPickupTime?: string;
  status?: string;
}

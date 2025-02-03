// src/app/models/claim.model.ts
export interface Claim {
  claimId: string;
  description: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected'
  userId: string;
  branchId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

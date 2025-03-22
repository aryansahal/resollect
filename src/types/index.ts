// Portfolio filter types
export type FilterTab =
  | "all"
  | "preSarfaesi"
  | "npa"
  | "responses"
  | "symbolic"
  | "dmOrder"
  | "physical"
  | "auctions";

// Loan related types
export interface Loan {
  id: string;
  loanType: string;
  borrower: string;
  borrowerAddress: string;
  coBorrowerName: string;
  coBorrowerAddress: string;
  currentDPD: number;
  sanctionAmount: string;
  region: string;
  status: string;
}

// Document types for upload functionality
export interface Document {
  name: string;
  type: string;
  remarks?: string;
  file: File;
  createdAt: Date;
}

interface TableDetailRequest {
  id: string;
  invDate: string;
  paymentContent: string;
  amount: number;
  invNo: number;
  industry: string;
  departmentOnTable: string;
  note: string;
}

interface Approver {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
}

export interface PaymentRequest {
  id: string;
  requestId: string;
  requestCode: string;
  userName: string;
  createAt: string;
  status: string;
  purpose: string;
  department: string;
  paymentFor: string;
  supplier: string;
  currency: string;
  poNumber: number;
  exchangeRate: number;
  tableDetailRequest: TableDetailRequest[];
  method: string;
  approverIds: Approver[];
}

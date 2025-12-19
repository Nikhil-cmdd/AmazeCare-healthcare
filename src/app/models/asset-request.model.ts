/*export interface AssetRequest {
  id?: number;
  employeeId: number;
  assetName: string;
  quantity: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}*/

export interface AssetRequest {
  id: number;
  employee: { id: number; fullName: string; };
  asset: { id: number; name: string; category: string; };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestDate: string;
}


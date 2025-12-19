import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssetRequestService } from '@services/asset-request';
import { AssetRequest } from '@models/asset-request.model';

@Component({
  selector: 'app-asset-requests',
  standalone: true,
  templateUrl: './asset-request.html',
  imports: [CommonModule, FormsModule]
})
export class AssetRequestsComponent implements OnInit {
  assetRequests: AssetRequest[] = [];

  constructor(private assetRequestService: AssetRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.assetRequestService.getAll().subscribe({
      next: data => this.assetRequests = data
    });
  }

  updateStatus(request: AssetRequest, status: 'APPROVED' | 'REJECTED'): void {
    const updated = { ...request, status };
    this.assetRequestService.update(updated).subscribe({
      next: () => {
        this.loadRequests();
        alert(`Request ${status.toLowerCase()}`);
      }
    });
  }
}

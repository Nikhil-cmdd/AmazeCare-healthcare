import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetService } from '@services/asset';
import { Asset } from '@models/asset.model';

@Component({
  selector: 'app-assets',
  standalone: true,
  templateUrl: './asset.html',
  imports: [CommonModule, FormsModule]
})
export class AssetsComponent implements OnInit {
  assets: Asset[] = [];
  assetForm: Asset = {} as Asset;
  editing = false;

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetService.getAll().subscribe({
      next: data => this.assets = data
    });
  }

  saveAsset(): void {
    if (this.editing && this.assetForm.id) {
      this.assetService.update(this.assetForm).subscribe({
        next: () => {
          alert('Asset updated');
          this.clearForm();
          this.loadAssets();
        }
      });
    } else {
      this.assetService.create(this.assetForm).subscribe({
        next: () => {
          alert('Asset added');
          this.clearForm();
          this.loadAssets();
        }
      });
    }
  }

  editAsset(asset: Asset): void {
    this.assetForm = { ...asset };
    this.editing = true;
  }

  deleteAsset(id: number): void {
    if (confirm('Delete this asset?')) {
      this.assetService.delete(id).subscribe({
        next: () => this.loadAssets()
      });
    }
  }

  clearForm(): void {
    this.assetForm = {} as Asset;
    this.editing = false;
  }
}

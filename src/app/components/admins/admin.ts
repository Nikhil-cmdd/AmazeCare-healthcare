import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@services/admin';
import { Admin } from '@models/admin.model';

@Component({
  selector: 'app-admins',
  standalone: true,
  templateUrl: './admin.html',
  imports: [CommonModule, FormsModule]
})
export class AdminsComponent implements OnInit {
  admins: Admin[] = [];
  adminForm: Admin = {} as Admin;
  editing = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAll().subscribe({
      next: data => this.admins = data
    });
  }

  saveAdmin(): void {
    if (this.editing && this.adminForm.id) {
      this.adminService.update(this.adminForm).subscribe({
        next: () => {
          alert('Admin updated');
          this.clearForm();
          this.loadAdmins();
        }
      });
    } else {
      this.adminService.create(this.adminForm).subscribe({
        next: () => {
          alert('Admin created');
          this.clearForm();
          this.loadAdmins();
        }
      });
    }
  }

  editAdmin(admin: Admin): void {
    this.adminForm = { ...admin };
    this.editing = true;
  }

  deleteAdmin(id: number): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.delete(id).subscribe({
        next: () => {
          alert('Admin deleted');
          this.loadAdmins();
        }
      });
    }
  }

  clearForm(): void {
    this.adminForm = {} as Admin;
    this.editing = false;
  }
}

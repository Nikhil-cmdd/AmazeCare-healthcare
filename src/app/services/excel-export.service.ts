import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface ExcelExportOptions {
  fileName?: string;
  sheetName?: string;
  headers?: string[];
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  constructor() { }

  /**
   * Export data to Excel file
   * @param options - Export configuration options
   */
  exportToExcel(options: ExcelExportOptions): void {
    const {
      fileName = 'export',
      sheetName = 'Sheet1',
      headers,
      data
    } = options;

    // Prepare worksheet data
    let worksheetData: any[] = [];

    // Add headers if provided
    if (headers && headers.length > 0) {
      worksheetData.push(headers);
    }

    // Add data rows
    if (data && data.length > 0) {
      // If headers are provided, use them to map data
      if (headers && headers.length > 0) {
        data.forEach((item: any) => {
          const row: any = {};
          headers.forEach(header => {
            row[header] = this.getNestedValue(item, header);
          });
          worksheetData.push(Object.values(row));
        });
      } else { // If no headers, use all data as is
        worksheetData = data.map((item: any) => Object.values(item));
      }
    }

    // Create workbook and worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate and download file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  /**
   * Export doctors data to Excel
   */
  exportDoctors(doctors: any[]): void {
    const headers = ['ID', 'Full Name', 'Specialty', 'Experience', 'Qualification', 'Hospital', 'Email', 'Contact Number', 'Gender'];
    this.exportToExcel({
      fileName: 'doctors_export',
      sheetName: 'Doctors',
      headers,
      data: doctors
    });
  }

  /**
   * Export patients data to Excel
   */
  exportPatients(patients: any[]): void {
    const headers = ['ID', 'Full Name', 'Gender', 'Date of Birth', 'Contact Number', 'Email', 'Medical History'];
    this.exportToExcel({
      fileName: 'patients_export',
      sheetName: 'Patients',
      headers,
      data: patients
    });
  }

  /**
   * Export employees data to Excel
   */
  exportEmployees(employees: any[]): void {
    const headers = ['ID', 'Full Name', 'Department', 'Designation', 'Contact Number', 'Email', 'Gender', 'Hospital'];
    this.exportToExcel({
      fileName: 'employees_export',
      sheetName: 'Employees',
      headers,
      data: employees
    });
  }

  /**
   * Export appointments data to Excel
   */
  exportAppointments(appointments: any[]): void {
    const headers = ['ID', 'Patient', 'Doctor', 'Appointment Date', 'Status', 'Reason', 'Hospital'];
    this.exportToExcel({
      fileName: 'appointments_export',
      sheetName: 'Appointments',
      headers,
      data: appointments
    });
  }

  /**
   * Export assets data to Excel
   */
  exportAssets(assets: any[]): void {
    const headers = ['ID', 'Name', 'Category', 'Quantity', 'Status', 'Hospital'];
    this.exportToExcel({
      fileName: 'assets_export',
      sheetName: 'Assets',
      headers,
      data: assets
    });
  }

  /**
   * Export asset requests data to Excel
   */
  exportAssetRequests(assetRequests: any[]): void {
    const headers = ['ID', 'Employee', 'Asset', 'Category', 'Status', 'Request Date'];
    this.exportToExcel({
      fileName: 'asset_requests_export',
      sheetName: 'Asset Requests',
      headers,
      data: assetRequests
    });
  }

  /**
   * Export consultations data to Excel
   */
  exportConsultations(consultations: any[]): void {
    const headers = ['ID', 'Appointment ID', 'Patient', 'Doctor', 'Appointment Date', 'Symptoms', 'Physical Exam', 'Treatment Plan', 'Recommended Tests', 'Prescription'];
    this.exportToExcel({
      fileName: 'consultations_export',
      sheetName: 'Consultations',
      headers,
      data: consultations
    });
  }

  /**
   * Export hospitals data to Excel
   */
  exportHospitals(hospitals: any[]): void {
    const headers = ['ID', 'Name', 'Address', 'Contact Number', 'Email'];
    this.exportToExcel({
      fileName: 'hospitals_export',
      sheetName: 'Hospitals',
      headers,
      data: hospitals
    });
  }

  /**
   * Export admins data to Excel
   */
  exportAdmins(admins: any[]): void {
    const headers = ['ID', 'Full Name', 'Email', 'Contact Number', 'Gender'];
    this.exportToExcel({
      fileName: 'admins_export',
      sheetName: 'Admins',
      headers,
      data: admins
    });
  }

  /**
   * Export all data to multiple sheets in one Excel file
   */
  exportAllData(data: {
    doctors?: any[];
    patients?: any[];
    employees?: any[];
    appointments?: any[];
    assets?: any[];
    assetRequests?: any[];
    consultations?: any[];
    hospitals?: any[];
    admins?: any[];
  }): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Export each data type to separate sheets
    if (data.doctors && data.doctors.length > 0) {
      const doctorsHeaders = ['ID', 'Full Name', 'Specialty', 'Experience', 'Qualification', 'Hospital', 'Email', 'Contact Number', 'Gender'];
      const doctorsData = this.prepareDataForSheet(data.doctors, doctorsHeaders);
      const doctorsSheet = XLSX.utils.aoa_to_sheet(doctorsData);
      XLSX.utils.book_append_sheet(workbook, doctorsSheet, 'Doctors');
    }

    if (data.patients && data.patients.length > 0) {
      const patientsHeaders = ['ID', 'Full Name', 'Gender', 'Date of Birth', 'Contact Number', 'Email', 'Medical History'];
      const patientsData = this.prepareDataForSheet(data.patients, patientsHeaders);
      const patientsSheet = XLSX.utils.aoa_to_sheet(patientsData);
      XLSX.utils.book_append_sheet(workbook, patientsSheet, 'Patients');
    }

    if (data.employees && data.employees.length > 0) {
      const employeesHeaders = ['ID', 'Full Name', 'Department', 'Designation', 'Contact Number', 'Email', 'Gender', 'Hospital'];
      const employeesData = this.prepareDataForSheet(data.employees, employeesHeaders);
      const employeesSheet = XLSX.utils.aoa_to_sheet(employeesData);
      XLSX.utils.book_append_sheet(workbook, employeesSheet, 'Employees');
    }

    if (data.appointments && data.appointments.length > 0) {
      const appointmentsHeaders = ['ID', 'Patient', 'Doctor', 'Appointment Date', 'Status', 'Reason', 'Hospital'];
      const appointmentsData = this.prepareDataForSheet(data.appointments, appointmentsHeaders);
      const appointmentsSheet = XLSX.utils.aoa_to_sheet(appointmentsData);
      XLSX.utils.book_append_sheet(workbook, appointmentsSheet, 'Appointments');
    }

    if (data.assets && data.assets.length > 0) {
      const assetsHeaders = ['ID', 'Name', 'Category', 'Quantity', 'Status', 'Hospital'];
      const assetsData = this.prepareDataForSheet(data.assets, assetsHeaders);
      const assetsSheet = XLSX.utils.aoa_to_sheet(assetsData);
      XLSX.utils.book_append_sheet(workbook, assetsSheet, 'Assets');
    }

    if (data.assetRequests && data.assetRequests.length > 0) {
      const assetRequestsHeaders = ['ID', 'Employee', 'Asset', 'Category', 'Status', 'Request Date'];
      const assetRequestsData = this.prepareDataForSheet(data.assetRequests, assetRequestsHeaders);
      const assetRequestsSheet = XLSX.utils.aoa_to_sheet(assetRequestsData);
      XLSX.utils.book_append_sheet(workbook, assetRequestsSheet, 'Asset Requests');
    }

    if (data.consultations && data.consultations.length > 0) {
      const consultationsHeaders = ['ID', 'Appointment ID', 'Patient', 'Doctor', 'Appointment Date', 'Symptoms', 'Physical Exam', 'Treatment Plan', 'Recommended Tests', 'Prescription'];
      const consultationsData = this.prepareDataForSheet(data.consultations, consultationsHeaders);
      const consultationsSheet = XLSX.utils.aoa_to_sheet(consultationsData);
      XLSX.utils.book_append_sheet(workbook, consultationsSheet, 'Consultations');
    }

    if (data.hospitals && data.hospitals.length > 0) {
      const hospitalsHeaders = ['ID', 'Name', 'Address', 'Contact Number', 'Email'];
      const hospitalsData = this.prepareDataForSheet(data.hospitals, hospitalsHeaders);
      const hospitalsSheet = XLSX.utils.aoa_to_sheet(hospitalsData);
      XLSX.utils.book_append_sheet(workbook, hospitalsSheet, 'Hospitals');
    }

    if (data.admins && data.admins.length > 0) {
      const adminsHeaders = ['ID', 'Full Name', 'Email', 'Contact Number', 'Gender'];
      const adminsData = this.prepareDataForSheet(data.admins, adminsHeaders);
      const adminsSheet = XLSX.utils.aoa_to_sheet(adminsData);
      XLSX.utils.book_append_sheet(workbook, adminsSheet, 'Admins');
    }

    // Generate and download file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'amazecare_complete_export');
  }

  /**
   * Helper method to prepare data for worksheet
   */
  private prepareDataForSheet(data: any[], headers: string[]): any[] {
    const worksheetData: any[] = [headers];
    
    data.forEach(item => {
      const row: any = {};
      headers.forEach(header => {
        row[header] = this.getNestedValue(item, header);
      });
      worksheetData.push(Object.values(row));
    });

    return worksheetData;
  }

  /**
   * Helper method to get nested object values
   */
  private getNestedValue(obj: any, path: string): any {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return undefined;
      }
    }
    
    return result;
  }

  /**
   * Save Excel file to user's device
   */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    
    link.href = url;
    link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
  }
} 
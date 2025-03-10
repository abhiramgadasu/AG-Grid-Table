import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [AgGridAngular,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';

  rowData: any[] = [
    { id: 1, ruleName: '2DS - Trace Changes', active: 'Y', type: 'Match', favourite: 'N', scheduled: 'Y', createdDate: '01-May-2024 01:15 PM', alert: 'Y' }
  ];

  columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Rule Name', field: 'ruleName', sortable: true, filter: true },
    { headerName: 'Active', field: 'active', sortable: true, filter: true },
    { headerName: 'Type', field: 'type', sortable: true, filter: true },
    { headerName: 'Favourite', field: 'favourite', sortable: true, filter: true },
    { headerName: 'Scheduled', field: 'scheduled', sortable: true, filter: true },
    { headerName: 'Created Date', field: 'createdDate', sortable: true, filter: true },
    { headerName: 'Alert', field: 'alert', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: any) => {
        return `
          <button class="btn btn-warning btn-sm edit-btn">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        `;
      },
      width: 200
    }
  ];

  newRule = {
    ruleName: '',
    active: 'Y',
    type: 'Match',
    favourite: 'N',
    scheduled: 'Y',
    createdDate: new Date().toLocaleString(),
    alert: 'Y'
  };

  gridApi: any;
  selectedRowId: number | null = null;

  onGridReady(params: any) {
    this.gridApi = params.api;

    this.gridApi.addEventListener('cellClicked', (event: any) => {
      if (event.column.colId === 'actions') {
        if (event.event.target.classList.contains('edit-btn')) {
          this.editRule(event.data);
        } else if (event.event.target.classList.contains('delete-btn')) {
          this.deleteRow(event.data.id);
        }
      }
    });
  }

  addRule() {
    if (!this.newRule.ruleName.trim()) return;

    if (this.selectedRowId !== null) {
      this.rowData = this.rowData.map(row =>
        row.id === this.selectedRowId ? { ...row, ...this.newRule } : row
      );
      this.selectedRowId = null;
    } else {
      const newRow = { id: this.rowData.length + 1, ...this.newRule };
      this.rowData = [...this.rowData, newRow];
    }

    this.resetForm();
  }

  editRule(row: any) {
    this.selectedRowId = row.id;
    this.newRule = { ...row };
  }

  deleteRow(id: number) {
    this.rowData = this.rowData.filter(row => row.id !== id);
  }

  deleteSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedNodes.map((node: any) => node.data.id);
    this.rowData = this.rowData.filter(row => !selectedIds.includes(row.id));
  }
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }
  resetForm() {
    this.newRule = {
      ruleName: '',
      active: 'Y',
      type: 'Match',
      favourite: 'N',
      scheduled: 'Y',
      createdDate: new Date().toLocaleString(),
      alert: 'Y'
    };
  }
}

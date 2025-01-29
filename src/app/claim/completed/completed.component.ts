import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-completed',
  imports: [CommonModule],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {

  completedOrders = [
    { slipNumber: '10001', address: '123 Main St', status: 'Completed', completedAt: new Date() },
    { slipNumber: '10002', address: '456 Oak St', status: 'Completed', completedAt: new Date() },
    { slipNumber: '10003', address: '789 Elm St', status: 'Completed', completedAt: new Date() },
  ];

  filteredOrders = [...this.completedOrders];

  // Filters orders based on search input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredOrders = this.completedOrders.filter(order =>
      Object.values(order).some(val => val.toString().toLowerCase().includes(filterValue))
    );
  }

  // Maintains 10 rows regardless of filtered data
  generateEmptyRows(dataLength: number): number[] {
    const totalRows = 10;
    return Array(totalRows - dataLength).fill(0);
  }
}

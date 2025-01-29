import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paid',
  imports: [CommonModule],
  templateUrl: './paid.component.html',
  styleUrl: './paid.component.css'
})
export class PaidComponent {
  pendingOrders = [
    { slipNumber: '12345', address: '123 Main St', status: 'Unpaid', createdAt: new Date() },
    { slipNumber: '67890', address: '456 Elm St', status: 'Paid', createdAt: new Date() },
    { slipNumber: '54321', address: '789 Oak St', status: 'Unpaid', createdAt: new Date() },
  ];

  // Filtered list of orders to display
  filteredOrders = [...this.pendingOrders];

  // Filters orders based on search input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredOrders = this.pendingOrders.filter(order =>
      Object.values(order).some(val =>
        val.toString().toLowerCase().includes(filterValue)
      )
    );
  }

  // Maintains 10 rows regardless of filtered data
  generateEmptyRows(dataLength: number): number[] {
    const totalRows = 10;
    return Array(totalRows - dataLength).fill(0);
  }
}


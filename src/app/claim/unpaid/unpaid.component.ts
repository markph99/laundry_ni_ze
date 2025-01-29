import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unpaid',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './unpaid.component.html',
  styleUrl: './unpaid.component.css'
})
export class UnpaidComponent {
  faMoneyCheckAlt = faMoneyCheckAlt; // Assign the FontAwesome icon
  displayedOrders = [
    { slipNumber: '12345', address: '123 Main St', status: 'Unpaid', bill: 100, balance: 100, createdAt: new Date() },
    { slipNumber: '67890', address: '456 Elm St', status: 'Unpaid', bill: 50, balance: 50, createdAt: new Date() },
    { slipNumber: '11223', address: '789 Oak St', status: 'Paid', bill: 75, balance: 0, createdAt: new Date() },
  ];

  filteredOrders = [...this.displayedOrders];
  isModalOpen = false;
  selectedOrder: any = null;
  paymentAmount: number = 0;
  change: number = 0;


  openModal(order: any) {
    this.selectedOrder = { ...order };
    this.paymentAmount = 0;
    this.change = 0;
    this.isModalOpen = true;
  }

  calculateChange() {
    if (this.paymentAmount >= this.selectedOrder.balance) {
      this.change = this.paymentAmount - this.selectedOrder.balance;
    } else {
      this.change = 0;
    }
  }

  processPayment() {
    if (this.paymentAmount >= this.selectedOrder.balance) {
      this.selectedOrder.status = 'Paid';
      this.selectedOrder.balance = 0;
      this.isModalOpen = false;
    } else {
      alert('Insufficient payment. Please enter the full amount.');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredOrders = this.displayedOrders.filter(order =>
      Object.values(order).some(val => val.toString().toLowerCase().includes(filterValue))
    );
  }

  get emptyRows(): number[] {
    return Array(10 - this.filteredOrders.length).fill(0);
  }
}

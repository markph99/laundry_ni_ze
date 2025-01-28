import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
submitPayment() {
throw new Error('Method not implemented.');
}
filterTable($event: Event) {
throw new Error('Method not implemented.');
}
activeTab: string = 'pending';  // Default active tab
isModalOpen: boolean = false; // Modal visibility
selectedOrder: any = null;  // Selected order for modal
cashPayment: number = 0;  // Value of cash payment entered
change: number = 0;  // Calculated change

pendingOrders = [
  { slipNumber: 1, address: 'Address 1', status: 'Pending', bill: 100, advancePayment: 50, createdAt: new Date() },
  { slipNumber: 2, address: 'Address 2', status: 'Pending', bill: 200, advancePayment: 100, createdAt: new Date() }
];  // Example pending orders data

paidOrders = [
  { slipNumber: 3, address: 'Address 3', status: 'Paid', bill: 150, advancePayment: 150, createdAt: new Date() },
  { slipNumber: 4, address: 'Address 4', status: 'Paid', bill: 300, advancePayment: 300, createdAt: new Date() }
];  // Example paid orders data

completedOrders = [
  { slipNumber: 5, address: 'Address 5', status: 'Completed', bill: 250, advancePayment: 250, createdAt: new Date() },
  { slipNumber: 6, address: 'Address 6', status: 'Completed', bill: 400, advancePayment: 400, createdAt: new Date() }
];  // Example completed orders data

constructor() {}

ngOnInit(): void {}

// Show Pending job orders
showPending() {
  this.activeTab = 'pending';
}

// Show Paid job orders
showPaid() {
  this.activeTab = 'paid';
}

// Show Completed job orders
showCompleted() {
  this.activeTab = 'completed';
}

// Open Modal and pass selected order
openModal(order: any): void {
  this.selectedOrder = order;
  this.cashPayment = 0;  // Reset cash payment input
  this.change = 0;  // Reset change
  this.isModalOpen = true;
}

// Close Modal
closeModal(): void {
  this.isModalOpen = false;
}

// Calculate Balance
calculateBalance(order: any): number {
  return order.bill - order.advancePayment > 0 ? order.bill - order.advancePayment : 0;
}

// Update Change based on entered cash payment
updateChange() {
  if (this.selectedOrder) {
    const balance = this.calculateBalance(this.selectedOrder);
    this.change = this.cashPayment - balance > 0 ? this.cashPayment - balance : 0;
  }
}
}

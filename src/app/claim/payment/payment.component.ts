import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  activeTab: string = 'pending';
  isModalOpen: boolean = false;
  isReadyModalOpen: boolean = false;
  isCompletedModalOpen: boolean = false;
  selectedOrder: any = null;
  cashPayment: number = 0;
  change: number = 0;
  filteredOrders: any[] = [];

  // Example data
  pendingOrders = [
    { slipNumber: 1, address: 'Address 1', status: 'Pending', bill: 100, advancePayment: 50, createdAt: new Date() },
    { slipNumber: 2, address: 'Address 2', status: 'Pending', bill: 200, advancePayment: 100, createdAt: new Date() },
  ];

  paidOrders = [
    { slipNumber: 3, address: 'Address 3', status: 'Paid', bill: 150, advancePayment: 150, createdAt: new Date() },
    { slipNumber: 4, address: 'Address 4', status: 'Paid', bill: 300, advancePayment: 300, createdAt: new Date() },
  ];

  completedOrders = [
    {
      slipNumber: 5,
      address: 'Address 5',
      status: 'Completed',
      bill: 250,
      advancePayment: 250,
      createdAt: new Date(),
      completedAt: new Date('2023-12-20T10:00:00'),
    },
    {
      slipNumber: 6,
      address: 'Address 6',
      status: 'Completed',
      bill: 400,
      advancePayment: 400,
      createdAt: new Date(),
      completedAt: new Date('2023-12-22T15:30:00'),
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.updateFilteredOrders(); // Initialize the filtered orders list
  }

  // Set active tab and update the filtered orders
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.updateFilteredOrders();
  }

  // Update filtered orders based on the active tab
  updateFilteredOrders(): void {
    if (this.activeTab === 'pending') {
      this.filteredOrders = this.pendingOrders;
    } else if (this.activeTab === 'paid') {
      this.filteredOrders = this.paidOrders;
    } else if (this.activeTab === 'completed') {
      this.filteredOrders = this.completedOrders;
    }
  }

  // Filter table by search input
  filterTable(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    const allOrders =
      this.activeTab === 'pending'
        ? this.pendingOrders
        : this.activeTab === 'paid'
        ? this.paidOrders
        : this.completedOrders;

    this.filteredOrders = allOrders.filter(
      (order) =>
        order.slipNumber.toString().includes(searchValue) ||
        order.address.toLowerCase().includes(searchValue) ||
        order.status.toLowerCase().includes(searchValue)
    );
  }

  // Open Modal and pass selected order
  openModal(order: any): void {
    this.selectedOrder = order;
    this.cashPayment = 0; // Reset cash payment input
    this.change = 0; // Reset change
    this.isModalOpen = true;
  }

  // Close Modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedOrder = null;
  }

  // Open Ready-to-Receive Modal
  openReadyModal(order: any): void {
    this.selectedOrder = order;
    this.isReadyModalOpen = true;
  }

  // Close Ready-to-Receive Modal
  closeReadyModal(): void {
    this.isReadyModalOpen = false;
    this.selectedOrder = null;
  }

  // Mark as Completed
  markAsCompleted(): void {
    if (this.selectedOrder) {
      this.selectedOrder.status = 'Completed';
      this.selectedOrder.completedAt = new Date(); // Set the completed date
      this.completedOrders.push(this.selectedOrder); // Move to completed orders
      this.paidOrders = this.paidOrders.filter((order) => order !== this.selectedOrder); // Remove from paid orders
      this.updateFilteredOrders();
      this.closeReadyModal();
      alert('Order marked as completed!');
    }
  }

  // Open Completed Details Modal
  openCompletedModal(order: any): void {
    this.selectedOrder = order;
    this.isCompletedModalOpen = true;
  }

  // Close Completed Details Modal
  closeCompletedModal(): void {
    this.isCompletedModalOpen = false;
    this.selectedOrder = null;
  }

  // Submit payment logic
  submitPayment(): void {
    if (this.selectedOrder) {
      const balance = this.calculateBalance(this.selectedOrder);
      if (this.cashPayment >= balance) {
        this.selectedOrder.status = 'Paid';
        this.paidOrders.push(this.selectedOrder); // Move to paid orders
        this.pendingOrders = this.pendingOrders.filter((order) => order !== this.selectedOrder); // Remove from pending orders
        this.closeModal();
        this.updateFilteredOrders();
        alert('Payment successful!');
      } else {
        alert('Insufficient payment. Please enter enough cash.');
      }
    }
  }

  // Calculate Balance
  calculateBalance(order: any): number {
    return Math.max(order.bill - order.advancePayment, 0);
  }

  // Update Change based on entered cash payment
  updateChange(): void {
    if (this.selectedOrder) {
      const balance = this.calculateBalance(this.selectedOrder);
      this.change = Math.max(this.cashPayment - balance, 0);
    }
  }
}

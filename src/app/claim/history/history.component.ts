import { Component, OnInit } from '@angular/core';
import { JobOrderService } from '../../services/job-order.service';
import { JobOrder } from '../../models/job-order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  dates: string[] = [];
  filteredDates: string[] = [];
  currentDate: string = new Date().toISOString().split('T')[0];
  selectedDate: string = this.currentDate;
  jobOrders: JobOrder[] = [];
  filteredJobOrders: JobOrder[] = [];
  paginatedOrders: JobOrder[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  isSidebarOpen: boolean = false;

  constructor(private jobOrderService: JobOrderService) {}

  // Method to toggle the sidebar visibility
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  ngOnInit(): void {
    this.generateDates();
    this.filteredDates = [...this.dates];
    this.fetchJobOrders();
    this.showDetails(this.selectedDate);
  }

  // Generate recent dates for the sidebar
  generateDates(): void {
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      this.dates.push(date.toISOString().split('T')[0]);
    }
  }

  // Filter the date list based on search input
  filterDates(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDates = this.dates.filter((date) => date.includes(query));
  }

  // Filter the table based on search input
  filterTable(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJobOrders = this.jobOrders.filter(
      (order) =>
        (order.slipNumber && order.slipNumber.toString().includes(query)) ||
        (order.address && order.address.toLowerCase().includes(query)) ||
        (order.status && order.status.toLowerCase().includes(query)) ||
        (order.createdAt &&
          new Date(order.createdAt).toISOString().toLowerCase().includes(query))
    );
    this.currentPage = 1; // Reset pagination
    this.updatePaginatedOrders();
  }

  // Show job orders for the selected date
  showDetails(date: string): void {
    this.selectedDate = date;
    this.filteredJobOrders = this.jobOrders.filter(
      (order) => new Date(order.createdAt).toISOString().split('T')[0] === date
    );
    this.currentPage = 1;
    this.updatePaginatedOrders();
  }

  // Fetch job orders from the backend
  fetchJobOrders(): void {
    this.jobOrderService.getJobOrders().subscribe({
      next: (data) => {
        this.jobOrders = data; // Assign fetched job orders
        this.filteredJobOrders = [...this.jobOrders]; // Initially display all job orders
        this.updatePaginatedOrders(); // Update pagination
      },
      error: (err) => {
        console.error('Error fetching job orders:', err);
      },
    });
  }

  // Update paginated orders for the current page
  updatePaginatedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.filteredJobOrders.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(
      this.filteredJobOrders.length / this.itemsPerPage
    );
  }

  // Go to the next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  // Go to the previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }
}

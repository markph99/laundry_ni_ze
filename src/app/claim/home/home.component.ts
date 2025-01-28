import { Component } from '@angular/core';
import { JobOrder } from '../../models/job-order';
import { JobOrderService } from '../../services/job-order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  jobOrders: JobOrder[] = []; // Original fetched job orders
  paginatedJobOrders: JobOrder[] = []; // Job orders for the current page
  filteredJobOrders: JobOrder[] = []; // Filtered job orders based on search
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 5; // Number of items per page
  totalPages: number = 0; // Total number of pages

  constructor(private jobOrderService: JobOrderService) {}

  ngOnInit(): void {
    this.fetchJobOrders();
  }

  // Fetch job orders from the server
  fetchJobOrders(): void {
    this.jobOrderService.getJobOrders().subscribe({
      next: (data) => {
        this.jobOrders = data.map((job) => ({
          ...job,
          balance: Math.max((job.bill || 0) - (job.advancePayment || 0), 0),
          change: (job.advancePayment || 0) > (job.bill || 0)
            ? (job.advancePayment || 0) - (job.bill || 0)
            : 0,
          pickupTime: job.pickupTime ? this.formatTime(job.pickupTime) : 'N/A',
        }));
        this.filteredJobOrders = this.jobOrders; // Initially, display all job orders
        this.totalPages = Math.ceil(this.filteredJobOrders.length / this.itemsPerPage);
        this.updatePaginatedJobOrders();
      },
      error: (err) => {
        console.error('Error fetching job orders:', err);
      },
    });
  }

  // Format time from 24-hour to 12-hour with AM/PM
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  // Filter job orders by all fields
  filterByQuery(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase(); // Get search input
    this.filteredJobOrders = this.jobOrders.filter((job) =>
      Object.values(job)
        .map((value) => (value ? value.toString().toLowerCase() : '')) // Convert all fields to strings
        .some((fieldValue) => fieldValue.includes(query)) // Check if any field matches the query
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.totalPages = Math.ceil(this.filteredJobOrders.length / this.itemsPerPage);
    this.updatePaginatedJobOrders();
  }

  // Update paginated job orders for the current page
  updatePaginatedJobOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobOrders = this.filteredJobOrders.slice(startIndex, endIndex);
  }

  // Go to the next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedJobOrders();
    }
  }

  // Go to the previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedJobOrders();
    }
  }

  // Check if there is a previous page
  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  // Check if there is a next page
  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}

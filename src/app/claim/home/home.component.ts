import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
filterByAddress($event: Event) {
throw new Error('Method not implemented.');
}
  jobOrders: JobOrder[] = []; // Complete job orders fetched from the server
  paginatedJobOrders: JobOrder[] = []; // Job orders for the current page
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 5; // Number of items per page
  totalPages: number = 0; // Total number of pages

  constructor(
    private router: Router,
    private jobOrderService: JobOrderService
  ) {}

  ngOnInit(): void {
    this.fetchJobOrders();
  }

  // Fetch job orders from the server
  fetchJobOrders(): void {
    this.jobOrderService.getJobOrders().subscribe({
      next: (data) => {
        this.jobOrders = data;
        this.totalPages = Math.ceil(this.jobOrders.length / this.itemsPerPage);
        this.updatePaginatedJobOrders();
      },
      error: (err) => {
        console.error('Error fetching job orders:', err);
      },
    });
  }

  // Update the paginated job orders for the current page
  updatePaginatedJobOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobOrders = this.jobOrders.slice(startIndex, endIndex);
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

  // Change the current page and update paginated job orders
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedJobOrders();
    }
  }

  // Get the range of page numbers to display in the pagination
  getPaginationRange(): number[] {
    const maxPagesToShow = 5; // Maximum visible page buttons
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    // Adjust start and end pages if necessary
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const range: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  }

  // Update the state of pagination buttons
  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}

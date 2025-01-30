import { Component, OnInit } from '@angular/core';
import { JobOrder } from '../../models/job-order';
import { JobOrderService } from '../../services/job-order.service';
import { ProductService } from '../../services/product.service'; // ✅ Import ProductService
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Ensure it supports standalone components
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  jobOrders: JobOrder[] = [];
  paginatedJobOrders: JobOrder[] = [];
  filteredJobOrders: JobOrder[] = [];
  clothingItems: Product[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(
    private jobOrderService: JobOrderService,
    private productService: ProductService // ✅ Inject ProductService
  ) {}

  ngOnInit(): void {
    this.fetchJobOrders();
    this.fetchClothingItems(); // ✅ Fetch clothing items when component loads
  }

  // Fetch clothing types from the database
  fetchClothingItems(): void {
    this.productService.getProduct().subscribe(
      (products) => {
        this.clothingItems = products;
      },
      (error) => {
        console.error('Error fetching clothing items:', error);
      }
    );
  }

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
        this.filteredJobOrders = this.jobOrders;
        this.totalPages = Math.ceil(this.filteredJobOrders.length / this.itemsPerPage);
        this.updatePaginatedJobOrders();
      },
      error: (err) => {
        console.error('Error fetching job orders:', err);
      },
    });
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  filterByQuery(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJobOrders = this.jobOrders.filter((job) =>
      Object.values(job)
        .map((value) => (value ? value.toString().toLowerCase() : ''))
        .some((fieldValue) => fieldValue.includes(query))
    );
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredJobOrders.length / this.itemsPerPage);
    this.updatePaginatedJobOrders();
  }

  updatePaginatedJobOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobOrders = this.filteredJobOrders.slice(startIndex, endIndex);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedJobOrders();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedJobOrders();
    }
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}

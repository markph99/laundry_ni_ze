import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JobOrderService } from '../../services/job-order.service';
import { JobOrder } from '../../models/job-order';

@Component({
  selector: 'app-history',
  imports: [CommonModule ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  dates: string[] = [];
  jobOrders: JobOrder[] = [];
  filteredJobOrders: JobOrder[] = [];
  selectedDate: string | null = null;
  currentDate: string = new Date().toISOString().split('T')[0];

  constructor(private jobOrderService: JobOrderService) {}

  ngOnInit(): void {
    this.fetchJobOrders();
  }

  fetchJobOrders(): void {
    this.jobOrderService.getJobOrders().subscribe((data) => {
      // Convert createdAt to ISO string if it's a timestamp
      this.jobOrders = data.map((order) => ({
        ...order,
        createdAt: typeof order.createdAt === 'number'
          ? new Date(order.createdAt).toISOString()
          : order.createdAt,
      }));

      // Extract unique dates from createdAt
      this.dates = [...new Set(this.jobOrders.map((order) => order.createdAt.split('T')[0]))];

      // Show today's orders by default
      this.showDetails(this.currentDate);
    });
  }

  showDetails(date: string): void {
    this.selectedDate = date;
    this.filteredJobOrders = this.jobOrders.filter(
      (order) => order.createdAt.split('T')[0] === date
    );
  }
}

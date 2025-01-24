import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobOrder } from '../../models/job-order';
import { JobOrderService } from '../../services/job-order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private jobOrderService: JobOrderService
  ) {}
  goHome() {
    this.router.navigate(['/']);
  }
  jobOrders: JobOrder[] = [];

  ngOnInit(): void {
    this.fetchJobOrders();
  }

  fetchJobOrders(): void {
    this.jobOrderService.getJobOrders().subscribe({
      next: (data) => {
        this.jobOrders = data;
      },
      error: (err) => {
        console.error('Error fetching job orders:', err);
      },
    });
  }
}

import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-analytics',
  imports: [RouterLink],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.createOrdersChart();
    this.createRevenueChart();
  }

  // Create Orders Breakdown Chart
  createOrdersChart(): void {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Completed'],
        datasets: [
          {
            data: [15, 50], // Example data
            backgroundColor: ['#facc15', '#34d399'], // Yellow and Green
            hoverBackgroundColor: ['#fbbf24', '#10b981'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  // Create Revenue Trends Chart
  createRevenueChart(): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Months
        datasets: [
          {
            label: 'Revenue (₱)',
            data: [1000, 1500, 2000, 1800, 2300], // Example data
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
              color: '#6b7280',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Revenue (₱)',
              color: '#6b7280',
            },
            beginAtZero: true,
          },
        },
      },
    });
  }
}

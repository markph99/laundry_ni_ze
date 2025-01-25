import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobOrderService } from '../../services/job-order.service';
import { FormsModule } from '@angular/forms';
import { JobOrder } from '../../models/job-order';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private jobOrderService: JobOrderService
  ) {}

  onBack() {
    this.router.navigate(['/']);
  }

  formData: JobOrder = {
    slipNumber: '',
    address: '',
    phoneNumber: '',
    serviceType: '',
    pickupDate: '',
    pickupTime: '',
    bill: null,
    advancePayment: null,
    additionalInstructions: '',
    createdAt: new Date().toISOString(),
  };

  submitJobOrder(): void {
    // Set advancePayment to 0.00 if no value is provided
    if (this.formData.advancePayment === null || this.formData.advancePayment === undefined) {
      this.formData.advancePayment = 0.00;
    }

    this.jobOrderService.addJobOrder(this.formData).subscribe(
      (response) => {
        console.log('Job Order Submitted:', response);
        alert('Job order added successfully!');
        this.resetForm();
      },
      (error) => {
        console.error('Error submitting job order:', error);
        alert('Error adding job order.');
      }
    );
  }

  resetForm(): void {
    this.formData = {
      slipNumber: '',
      address: '',
      phoneNumber: '',
      serviceType: '',
      pickupDate: '',
      pickupTime: '',
      bill: null,
      advancePayment: null, // Reset to null
      additionalInstructions: '',
      createdAt: new Date().toISOString(),
    };
  }
}

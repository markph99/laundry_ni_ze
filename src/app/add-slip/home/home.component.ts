import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobOrderService } from '../../services/job-order.service';
import { FormsModule } from '@angular/forms';
import { JobOrder } from '../../models/job-order';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
onBack() {
this.router.navigate(['/']);
}
  clothingItems: Product[] = [];

  formData: JobOrder = {
    slipNumber: '',
    address: '',
    phoneNumber: '',
    serviceType: '',
    clothingType: '',
    kilograms: null,
    pickupDate: '',
    pickupTime: '',
    bill: null,
    advancePayment: null,
    balance: null,
    additionalInstructions: '',
    createdAt: new Date().toISOString(),
    change: '',
  };

  constructor(
    private router: Router,
    private jobOrderService: JobOrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchClothingItems();
  }

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

  submitJobOrder(): void {
    if (this.formData.kilograms === null || this.formData.kilograms <= 0) {
      alert('Please enter a valid weight (kg).');
      return;
    }

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
      clothingType: '',
      kilograms: null,
      pickupDate: '',
      pickupTime: '',
      bill: null,
      advancePayment: null,
      balance: null,
      additionalInstructions: '',
      createdAt: new Date().toISOString(),
      change: '',
    };
}
}

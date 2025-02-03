import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { JobOrderService } from '../../services/job-order.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { JobOrder } from '../../models/job-order';

@Component({
  selector: 'app-job-ord',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './job-ord.component.html',
  styleUrls: ['./job-ord.component.css'],
})
export class JobOrdComponent {
  products: any[] = [];
  addedProducts: any[] = [];
  selectedProduct: any = null;
  inputKilogram: number = 0;
  totalAmount: number = 0;
  showModal: boolean = false;
  showSummary: boolean = false;
  showReceipt: boolean = false;

  jobOrderForm: FormGroup;
  balance: number = 0;
  autoGenerateSlipNumber: boolean = true;

  constructor(
    private router: Router,
    private productService: ProductService,
    private jobOrderService: JobOrderService,
    private fb: FormBuilder
  ) {
    this.loadProducts();
    this.jobOrderForm = this.fb.group({
      customerName: [''],
      customerContact: [''],
      payment: [0],
      slipNumber: ['']
    });
    this.generateSlipNumber();
  }

  loadProducts(): void {
    this.productService.getProduct().subscribe((data) => {
      this.products = data;
    });
  }

  openModal(product: any): void {
    this.selectedProduct = product;
    this.inputKilogram = 0;
    this.totalAmount = 0;
    this.showModal = true;
  }

  calculateTotal(): void {
    if (this.inputKilogram > 0 && this.selectedProduct) {
      this.totalAmount = this.inputKilogram * this.selectedProduct.price;
    } else {
      this.totalAmount = 0;
    }
  }

  addProduct(): void {
    if (this.inputKilogram > 0 && this.selectedProduct) {
      this.addedProducts.push({
        productName: this.selectedProduct.name,
        unitPrice: this.selectedProduct.price,
        quantity: this.inputKilogram,
        totalPrice: this.totalAmount
      });
      this.showModal = false;
    }
  }

  getTotalAmount(): number {
    return this.addedProducts.reduce((sum, product) => sum + product.totalPrice, 0);
  }

  submitJobOrder(): void {
    if (this.addedProducts.length > 0) {
      if (this.autoGenerateSlipNumber) {
        this.generateSlipNumber();
      }
      this.showSummary = true;
    }
  }

  generateSlipNumber(): void {
    if (this.autoGenerateSlipNumber) {
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Generates an 8-digit number
      this.jobOrderForm.patchValue({ slipNumber: 'SLIP-' + randomNumber });
    }
  }

  toggleSlipNumberGeneration(): void {
    if (this.autoGenerateSlipNumber) {
      this.generateSlipNumber();
    } else {
      this.jobOrderForm.patchValue({ slipNumber: '' });
    }
  }

  confirmPayment(): void {
    const jobOrderData: Partial<JobOrder> = {
      slipNumber: this.jobOrderForm.value.slipNumber,
      customerName: this.jobOrderForm.value.customerName,
      customerContact: this.jobOrderForm.value.customerContact,
      payment: this.jobOrderForm.value.payment,
      products: this.addedProducts.map(product => ({
        productName: product.productName,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
        totalPrice: product.totalPrice
      })),
      totalAmount: this.getTotalAmount(),
      orderStatus: 'Paid',
      orderDate: new Date()
    };

    this.jobOrderService.createJobOrder(jobOrderData).subscribe((response) => {
      this.jobOrderForm.patchValue({ slipNumber: response.slipNumber || this.jobOrderForm.value.slipNumber });
      this.balance = this.getTotalAmount() - this.jobOrderForm.value.payment;
      this.showReceipt = true;
      this.showSummary = false;
    });
  }

  createEmptyRows(addedProductsLength: number, totalRows: number): any[] {
    const emptyRows = [];
    const rowsToAdd = totalRows - addedProductsLength;

    for (let i = 0; i < rowsToAdd; i++) {
      emptyRows.push({}); // Push an empty object for each empty row
    }

    return emptyRows;
  }

  goBack(): void {
    this.router.navigate(['/job_order']);
  }
}

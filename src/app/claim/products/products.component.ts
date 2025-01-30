import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  currentProductId: string | null = null;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  productToDelete: Product | null = null; // Stores the product selected for deletion

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProduct().subscribe(
      (data) => {
        console.log("API Response:", data);
        this.products = data.map(product => ({
          _id: product._id || product.id,
          name: product.name,
          price: product.price
        }) as Product);
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;

      if (this.currentProductId) {
        // Update existing product
        this.productService.editProduct(this.currentProductId, productData).subscribe(
          (response) => {
            const updatedProductIndex = this.products.findIndex(p => p._id === this.currentProductId);
            if (updatedProductIndex !== -1) {
              this.products[updatedProductIndex] = response;
            }
            this.closeEditModal();
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      } else {
        // Add new product
        this.productService.addProduct(productData).subscribe(
          (response) => {
            this.fetchProducts(); // Refresh list dynamically
            this.productForm.reset();
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      }
    }
  }

  openEditModal(product: Product) {
    this.currentProductId = product._id ?? product.id ?? null;
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
    });

    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.productForm.reset();
    this.currentProductId = null;
  }

  openDeleteModal(product: Product) {
    this.productToDelete = product;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.productToDelete = null;
  }

  confirmDelete() {
    if (!this.productToDelete || !this.productToDelete._id) {
      console.error("Error: Product ID is missing!", this.productToDelete);
      return;
    }

    console.log("Deleting Product with ID:", this.productToDelete._id);

    this.productService.deleteProduct(this.productToDelete._id).subscribe(
      () => {
        this.fetchProducts(); // Refresh list dynamically after deletion
        this.closeDeleteModal();
      },
      (error) => {
        console.error("Error deleting product:", error);
      }
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paid',
  imports: [CommonModule],
  templateUrl: './paid.component.html',
  styleUrl: './paid.component.css'
})
export class PaidComponent {
pendingOrders: any;

}

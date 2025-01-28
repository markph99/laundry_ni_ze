import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unpaid',
  imports: [CommonModule],
  templateUrl: './unpaid.component.html',
  styleUrl: './unpaid.component.css'
})
export class UnpaidComponent {
pendingOrders: any;

}

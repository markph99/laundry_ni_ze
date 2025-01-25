import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
showCompleted() {
throw new Error('Method not implemented.');
}
showPending() {
throw new Error('Method not implemented.');
}
data: any[] = [];
activeTab: string = 'pending';
}

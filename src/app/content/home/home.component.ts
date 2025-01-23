import { Component, OnInit } from '@angular/core';
import { Bubbles } from '../../models/bubbles';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 bubbles: Bubbles[] = [];

  ngOnInit() {
    const bubbleCount = 12; // Adjust to add more or fewer bubbles
    for (let i = 0; i < bubbleCount; i++) {
      const left = Math.floor(Math.random() * 101);   // 0–100
      const size = 30 + Math.floor(Math.random() * 51); // 30–80 px
      const delay = Math.random() * 5; // 0–5 seconds

      this.bubbles.push({ left, size, delay });
    }
  }

  onClaim() {
    alert('Claim clicked!');
  }

  onAddSlip() {
    alert('Add Slip clicked!');
  }
}

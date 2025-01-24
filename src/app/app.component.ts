import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bubbles } from './models/bubbles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'laundry_ni_ze';
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
}

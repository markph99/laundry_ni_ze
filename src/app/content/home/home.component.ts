import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  constructor(private router: Router){}


  onClaim() {
    this.router.navigate(['./claim'])
  }

  onAddSlip() {
    this.router.navigate(['./job_order']);
  }
}

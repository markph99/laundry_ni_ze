import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-ord',
  imports: [],
  templateUrl: './job-ord.component.html',
  styleUrl: './job-ord.component.css',
})
export class JobOrdComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['/job_order']);
  }
}

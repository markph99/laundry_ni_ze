import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim',
  imports: [],
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css',
})
export class ClaimComponent {
  constructor(
    private router: Router
  ) {}
  goBack() {
    this.router.navigate(['/job_order']);
  }
}

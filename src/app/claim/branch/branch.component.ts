import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BranchService } from '../../services/branch.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Branch } from '../../models/branch';

@Component({
  selector: 'app-branch',
  imports: [CommonModule, FormsModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent {
  // Branch Fields
  newBranch: Branch = {
    name: '',
    address: '',
    phoneNumber: '',
    operatingHours: ''
  };

  // User Fields
  username = '';
  password = '';
  selectedBranchId = ''; // Holds the selected branch
  branches: Branch[] = []; // Stores list of branches

  constructor(
    private branchService: BranchService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadBranches();
  }

  /** Fetch all existing branches */
  loadBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response.data;
      },
      error: (err) => {
        console.error('Error fetching branches:', err);
      }
    });
  }

  /** Create a new branch */
  registerBranch() {
    this.branchService.createBranch(this.newBranch).subscribe({
      next: (resp) => {
        alert('Branch created successfully!');
        this.loadBranches(); // Refresh branch list
        this.newBranch = { name: '', address: '', phoneNumber: '', operatingHours: '' }; // Reset form
      },
      error: (err) => {
        console.error('Error creating branch:', err);
      }
    });
  }

  /** Register a new user and assign to a branch */
  registerUser() {
    const payload = {
      username: this.username,
      password: this.password,
      branchId: this.selectedBranchId // Assign user to selected branch
    };

    this.userService.createUserForBranch(payload).subscribe({
      next: (response) => {
        alert('User registered successfully!');
        this.username = '';
        this.password = '';
        this.selectedBranchId = ''; // Reset form
      },
      error: (err) => {
        console.error('Error creating user:', err);
      }
    });
  }
}

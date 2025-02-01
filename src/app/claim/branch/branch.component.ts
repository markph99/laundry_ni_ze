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

  // Loading and error message states
  isLoading = false; // Declare isLoading as false by default
  errorMessage = ''; // Declare errorMessage as an empty string by default

  constructor(
    private branchService: BranchService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadBranches();
  }

  /** Fetch all existing branches */
  loadBranches() {
    this.isLoading = true; // Show loading indicator
    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response.data;
        this.errorMessage = ''; // Clear any previous error messages
      },
      error: (err) => {
        console.error('Error fetching branches:', err);
        this.errorMessage = 'Failed to load branches. Please try again later.';
      },
      complete: () => {
        this.isLoading = false; // Hide loading indicator
      }
    });
  }

  /** Create a new branch */
  registerBranch() {
    if (!this.newBranch.name || !this.newBranch.address) {
      this.errorMessage = 'Branch name and address are required.';
      return;
    }

    this.isLoading = true; // Show loading indicator
    this.branchService.createBranch(this.newBranch).subscribe({
      next: (resp) => {
        alert('Branch created successfully!');
        this.loadBranches(); // Refresh branch list
        this.newBranch = { name: '', address: '', phoneNumber: '', operatingHours: '' }; // Reset form
      },
      error: (err) => {
        console.error('Error creating branch:', err);
        this.errorMessage = 'Failed to create branch. Please try again later.';
      },
      complete: () => {
        this.isLoading = false; // Hide loading indicator
      }
    });
  }

  /** Register a new user and assign to a branch */
  registerUser() {
    if (!this.username || !this.password || !this.selectedBranchId) {
      this.errorMessage = 'Username, password, and branch are required.';
      return;
    }

    const payload = {
      username: this.username,
      password: this.password,
      branchId: this.selectedBranchId // Assign user to selected branch
    };

    this.isLoading = true; // Show loading indicator
    this.userService.createUserForBranch(payload).subscribe({
      next: (response) => {
        alert('User registered successfully!');
        this.username = '';
        this.password = '';
        this.selectedBranchId = ''; // Reset form
      },
      error: (err) => {
        console.error('Error creating user:', err);
        this.errorMessage = 'Failed to register user. Please try again later.';
      },
      complete: () => {
        this.isLoading = false; // Hide loading indicator
      }
    });
  }
}


// src/app/admin/admin.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  adminName: string | null = null;
  userProfile: any = null; // Store user profile data here

  constructor(private readonly apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the admin name from ApiService
    this.adminName = this.apiService.getAdminName();

    // Optionally, fetch the user profile if you haven't done it in LoginComponent
    // const adminId = this.apiService.getAdminId(); // Assume you store the admin ID in the service
    // this.apiService.getUserProfile(adminId).subscribe(profile => {
    //   this.userProfile = profile;
    // });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private readonly apiService: ApiService, private router: Router) { }
  formData: any = {
    name: '',
  }

  message: any = null;

  async handleSubmit() {
    if (!this.formData.name) {
      this.showMessage("Fields required")
      return;
    }

    try {
        this.showMessage('User Successfully login');
        this.router.navigate(['/profile'])
    } catch (error: any) {
      console.log(error)
      this.showMessage(error.error?.message || error.message || 'unable to login');
    }
  }



  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message == null
    }, 3000);
  }

}

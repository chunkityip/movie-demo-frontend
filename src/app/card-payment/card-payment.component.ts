import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';

interface PaymentModel {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: string;
}

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent {
  @Input() total!: number;
  submitted = false;

  paymentModel: PaymentModel = {
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    amount: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true;
    this.router.navigate(['/payment-success']);
  }
}

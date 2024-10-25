import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MovieTicket {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-create.component.html',
  styleUrl: './movie-create.component.css'
})
export class MovieCreateComponent {
  ticket: MovieTicket = {
    id: '12345',
    title: 'Star Wars: The Phantom Menace',
    price: 15.99,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BODVhNGIxOGItYWNlMi00YTA0LWI3NTctZmQxZGUwZDEyZWI4XkEyXkFqcGc@._V1_.jpg'

  };

  onAddShowings() {
    // Implement add showings logic
    console.log('Adding showings...');
  }

  onNotNow() {
    // Implement not now logic
    console.log('Not now clicked...');
  }
}

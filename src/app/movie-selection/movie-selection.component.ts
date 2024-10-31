import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-selection',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './movie-selection.component.html',
  styleUrl: './movie-selection.component.css'
})
export class MovieSelectionComponent {
  httpClient = inject(HttpClient);
  router = inject(Router);

  data: any[] = [];
  searchQuery: string = '';
  filteredMovies: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get('http://localhost:8080/home')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
        this.filteredMovies = data;
      });
  }

  searchMovies() {
    console.log('Search Query:', this.searchQuery);
    if (this.searchQuery.trim() === '') {
      this.filteredMovies = this.data;
    } else {
      this.filteredMovies = this.data.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    console.log('Filtered Movies:', this.filteredMovies);
  }

  navigateToSeatSelection(movieId: number) {
    // First fetch movie details
    this.httpClient.get(`http://localhost:8080/movie/${movieId}`)
      .subscribe((data: any) => {
        console.log('Movie details:', data);
        // Navigate to seat selection with movie ID as parameter
        this.router.navigate(['/seat'], {
          queryParams: { movieId: movieId }
        });
      }, error => {
        console.error('Error fetching movie details:', error);
      });
  }
}

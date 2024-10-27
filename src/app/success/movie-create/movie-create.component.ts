import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

interface Movie {
  id: number;
  title: string;
  description: string;
  coverImageBase64: string;
  // price?: number; // Add if you have price in your backend
}

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Get the movie ID from route parameters
    this.route.params.subscribe(params => {
      const movieId = +params['id']; // Convert string to number
      if (movieId) {
        this.loadMovie(movieId);
      }
    });
  }

  private loadMovie(id: number) {
    this.apiService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error: (error) => {
        console.error('Error loading movie:', error);
      }
    });
  }

  onAddShowings() {
    // Navigate to showings component with movie ID
    if (this.movie) {
      this.router.navigate(['/add-showings', this.movie.id]);
    }
  }

  onNotNow() {
    // Navigate back to movies list
    this.router.navigate(['/movies']);
  }
}

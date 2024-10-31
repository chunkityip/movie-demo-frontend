import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

interface Movie {
  id: number;
  title: string;
  description: string;
  // Make all image-related properties optional since they might not always be present
  coverImage: string;
  coverImageBase64?: string;
  image?: string;  // Changed from required to optional
  imageUrl?: string;  // Changed from required to optional
  price?: number;
}


interface TimeSlot {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-existing-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './existing-moving.component.html',
  styleUrls: ['./existing-moving.component.css']
})
export class ExistingMovieComponent implements OnInit {
  movies: Movie[] = [];
  currentMovieIndex = 0;
  selectedDate: string = '';
  selectedTime: string = '';
  showingForm: FormGroup;
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
  timeSlots: TimeSlot[] = [
    { time: '10:00', available: true },
    { time: '12:30', available: true },
    { time: '15:00', available: true },
    { time: '17:30', available: true },
    { time: '20:00', available: true },
    { time: '22:30', available: true }
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.showingForm = this.fb.group({
      movieId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.apiService.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies.map(movie => ({
          ...movie,
          // Ensure we're passing all required properties
          id: movie.id,
          title: movie.title,
          description: movie.description,
          coverImage: this.getImageUrl(movie.coverImageBase64)
        }));
        if (movies.length > 0) {
          this.showingForm.patchValue({
            movieId: movies[0].id
          });
        }
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  getImageUrl(imageData: string | undefined): string {
    if (!imageData) return 'assets/placeholder-image.png';
    if (imageData.startsWith('http') || imageData.startsWith('/')) {
      return imageData;
    }
    if (!imageData.startsWith('data:image')) {
      return `data:image/jpeg;base64,${imageData}`;
    }
    return imageData;
  }

  previousMovie(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
      this.updateFormMovieId();
    }
  }

  nextMovie(): void {
    if (this.currentMovieIndex < this.movies.length - 1) {
      this.currentMovieIndex++;
      this.updateFormMovieId();
    }
  }

  private updateFormMovieId(): void {
    this.showingForm.patchValue({
      movieId: this.movies[this.currentMovieIndex].id
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    const container = imgElement.parentElement;
    if (container) {
      container.classList.add('no-image');
    }
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.showingForm.patchValue({ date });
  }

  selectTime(time: string): void {
    this.selectedTime = time;
    this.showingForm.patchValue({ time });
  }

  handleSubmit(): void {
    if (this.showingForm.valid) {
      const showingData = {
        movieId: this.movies[this.currentMovieIndex].id,
        date: this.selectedDate,
        timeSlot: { time: this.selectedTime }
      };

      this.apiService.addNewShowing(showingData).subscribe({
        next: (response) => {
          console.log('Showing added successfully', response);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error adding showing:', error);
        }
      });
    }
  }
}

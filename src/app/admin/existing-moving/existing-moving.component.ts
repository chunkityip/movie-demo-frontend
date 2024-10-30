import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';


interface Movie {
  id: number;
  title: string;
  description: string;
  coverImageBase64: string;
  price?: number;
}

@Component({
  selector: 'app-existing-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './existing-moving.component.html',
  styleUrls: ['./existing-moving.component.css']
})

export class ExistingMovieComponent implements OnInit {
  movie: Movie[] = [];
  currentMovieIndex = 0;
  selectedDate: string = '';
  selectedTime: string = '';

  // Add these new properties
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: number[] = [];

  timeSlots = [
    { time: '10:00 am', available: true },
    { time: '12:00 pm', available: true },
    { time: '2:00 pm', available: false },
    { time: '4:00 pm', available: false },
    { time: '6:00 pm', available: true },
    { time: '8:00 pm', available: true }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMovie();
    this.calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  private loadMovie(id: number) {
      this.apiService.getMovieById(id).subscribe({
        next: (movie) => {
          this.movie = movie;
        }
      });
    }

  previousMovie(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
    }
  }

  selectDate(date: string): void {
    this.selectedDate = date;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  handleSubmit(): void {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Please select both date and time');
      return;
    }

    // Log the selected data for demonstration
    console.log('New Showing Created:', {
      movieId: this.movie[this.currentMovieIndex].id,
      movieTitle: this.movie[this.currentMovieIndex].title,
      date: this.selectedDate,
      time: this.selectedTime
    });

    // Navigate back to admin page
    alert('Showing created successfully! (Demo)');
    this.router.navigate(['/admin']);
  }
}

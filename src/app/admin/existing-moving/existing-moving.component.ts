import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Movie {
  id: number;
  title: string;
  coverImage: string;
}

@Component({
  selector: 'app-existing-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './existing-moving.component.html',
  styleUrls: ['./existing-moving.component.css']
})
export class ExistingMovieComponent implements OnInit {
  movies: Movie[] = [
    {
      id: 1,
      title: 'Star Wars',
      coverImage: 'https://lumiere-a.akamaihd.net/v1/images/star-wars-the-rise-of-skywalker-theatrical-poster-1000_ebc74357.jpeg'
    },
    {
      id: 2,
      title: 'Deadpool and Wolverine',
      coverImage: 'https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    },
    {
      id: 3,
      title: 'Avengers: Endgame',
      coverImage: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg'
    },
    {
      id: 4,
      title: 'Black Panther',
      coverImage: 'https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg'
    },
    {
      id: 5,
      title: 'Spider-Man : No Way Home',
      coverImage: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg'
    }
  ];

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // No need to load movies as we're using dummy data
    this.calendarDays = Array.from({length: 31}, (_, i) => i + 1);
  }

  nextMovie(): void {
    if (this.currentMovieIndex < this.movies.length - 3) {
      this.currentMovieIndex++;
    }
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
      movieId: this.movies[this.currentMovieIndex].id,
      movieTitle: this.movies[this.currentMovieIndex].title,
      date: this.selectedDate,
      time: this.selectedTime
    });

    // Navigate back to admin page
    alert('Showing created successfully! (Demo)');
    this.router.navigate(['/admin']);
  }
}

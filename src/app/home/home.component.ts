import { Component } from '@angular/core';
import { MovieShowingComponent } from '../movie-showing/movie-showing.component';
import { MovieShowing } from '../movieshowing';
import { CommonModule } from '@angular/common';
import { DataDisplayComponent } from '../data-display/data-display.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieShowingComponent, CommonModule, DataDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  movieShowingList: MovieShowing[] = [
    {
      id: 0,
      name: 'Star Wars',
      description: 'Once Upon a Time',
      photo: `${this.baseUrl}/example-house.jpg`,
    },
    {
      id: 1,
      name: 'Clone Wars',
      description: 'Once Upon a Time',
      photo: `${this.baseUrl}/example-house.jpg`,
    },
  ];
}

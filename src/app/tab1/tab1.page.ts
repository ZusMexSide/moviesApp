import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public recentMovies: Movie[] = [];
  public popular: Movie[] = [];

  constructor( private movieService: MoviesService ) {}

  ngOnInit(): void {
    this.movieService.getFeaturedMovies().subscribe({
      next: ( res ) => {
        this.recentMovies = res.results;
      }
    });
    this.getPopular();
  }

  loadMore() {
    this.getPopular();
  }

  getPopular() {
    this.movieService.getPopular().subscribe({
      next: ( res ) => {
        let arrTemp = [ ...this.popular, ...res.results ];
        this.popular = arrTemp;
      }
    });
  }

}

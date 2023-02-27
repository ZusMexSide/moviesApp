import { Component } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/interfaces';
import { LocalDataService } from '../services/local-data.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetail[] = [];
  genres: Genre[] = [];
  favoriteGenre: any[] = [];

  constructor(
    private storage: LocalDataService,
    private moviesService: MoviesService
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.movies = await this.storage.loadFavorites();
    this.genres = await this.moviesService.loadGenres();
    this.moviesSortedByGenre( this.genres, this.movies );
  }

  async reload() {
    this.movies = await this.storage.loadFavorites();
    this.moviesSortedByGenre( this.genres, this.movies );
  }

  moviesSortedByGenre( genres: Genre[], movies: MovieDetail[] ) {
    this.favoriteGenre = [];
    genres.forEach( genreItem => {
      this.favoriteGenre.push({
        genre: genreItem.name,
        movies: movies.filter( movie => {
          return movie.genres.find( genre => genre.id === genreItem.id )
        })
      });
    });
  }

}

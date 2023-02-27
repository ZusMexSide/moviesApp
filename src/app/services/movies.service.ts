import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseTMDB, MovieDetail, MovieCreditsResponse, Genre } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularPage: number = 0;
  genres: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( query: string ): Observable<T> {
    query = URL + query;
    query += `&api_key=${ apiKey }`;
    return this.http.get<T>( query );
  }

  getPopular() {
    this.popularPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularPage }`
    return this.executeQuery<ResponseTMDB>( query );
  }

  getFeaturedMovies() {
    const today = new Date();
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const month = today.getMonth() + 1;
    let monthString;

    if ( month < 10 ) {
      monthString = '0' + month;
    } else {
      monthString = month;;
    }

    const start = `${ today.getFullYear() }-${ monthString }-01`;
    const end =  `${ today.getFullYear() }-${ monthString }-${ lastDay }`;

    return this.executeQuery<ResponseTMDB>(`/discover/movie?primary_release_date.gte=${ start }&primary_release_date.lte=${ end }`);
  }

  getMovieDetail( id: number ) {
    return this.executeQuery<MovieDetail>(`/movie/${ id }?a=1`);
  }

  getActors( id: number ) {
    return this.executeQuery<MovieCreditsResponse>(`/movie/${ id }/credits?a=1`);
  }

  searchMovies( textToSearch: string ) {
    return this.executeQuery<ResponseTMDB>(`/search/movie?query=${ textToSearch }`);
  }

  loadGenres() {
    return new Promise<Genre[]>( ( resolve, reject ) => {
      this.executeQuery( '/genre/movie/list?a=1' ).subscribe({
        next: (res: any) => {
          this.genres = res['genres'];
          resolve( this.genres );
        }
      });
    });
  }

}

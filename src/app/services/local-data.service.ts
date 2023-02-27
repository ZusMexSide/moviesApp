import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private _storage: Storage | null = null;
  movies: MovieDetail[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  saveMovie( movie: MovieDetail ) {
    let exist: boolean = false;
    let message: string = '';
    for (const movieItem of this.movies) {
      if (  movie.id === movieItem.id ) {
        exist = true;
        break;
      }
    }
    if ( exist  ) {
      this.movies = this.movies.filter( movieFilter => movie.id !== movieFilter.id);
      message = 'Removed from favorites';
    } else {
      this.movies.push( movie );
      message= 'Added to favorites';
    }

    this.presentToast( message );
    this.storage.set('movies', this.movies);

    return !exist;
  }

  async loadFavorites() {
    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;
  }

async existMovie( id: number ) {
  await this.loadFavorites();
  const existe = this.movies.find( movie => movie.id === id );
  return ( existe ) ? true : false;
}

}

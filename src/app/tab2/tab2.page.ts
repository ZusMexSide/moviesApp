import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textToSearch: string = '';
  ideas: string[] = ['spiderman', 'Avengers', 'The lord of the rings', 'Fast & forious'];
  movies: Movie[] = [];
  searching: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  search( event: any ) {
    const value =  event.detail.value;
    if ( !value ) return;
    this.searching = true;
    this.moviesService.searchMovies(value).subscribe({
      next: movies => {
        this.movies = movies.results;
        this.searching = false;
      },
      error: error => console.log(error)
    });
  }

  async detail( id: number ) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}

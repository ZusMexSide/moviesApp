import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id!: number;
  movie!: MovieDetail;
  hide: number =  150;
  casting: Cast[] = [];
  slideOptsCasting = {
    slidesPerView: 3.3,
    freemode: true,
    spacebetween: -5
  }
  exist:boolean = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private storage: LocalDataService
  ) { }

  async ngOnInit() {
    this.exist = await this.storage.existMovie( this.id );
    this.moviesService.getMovieDetail( this.id ).subscribe({
      next: (movie) => {
        this.movie = movie;
      }
    });
    this.moviesService.getActors( this.id ).subscribe({
      next: (res) => {
        this.casting = res.cast;
      }
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  like() {
     this.exist = this.storage.saveMovie( this.movie );
  }

}

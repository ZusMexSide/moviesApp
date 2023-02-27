import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() movies: Movie[] = [];
  public slideOpts = {
    slidesPerView: 1.3,
    freeMode: true,
  }

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async seeDetails( id: number ) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      },
    });
    modal.present();
  }

}

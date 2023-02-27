import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() movies: Movie[] = [];
  public slideOpts = {
    slidesPerView: 3,
    freeMode: true,
  }

  constructor( private modalCtrl: ModalController ) { }

  async seeDetails( id: number ) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      },
    });
    modal.present();
    modal.onWillDismiss().then(() => this.closeModal.emit( true ) );
  }

}

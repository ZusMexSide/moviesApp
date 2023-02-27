import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() loadMore: EventEmitter<null> = new EventEmitter();

  public slideOpts = {
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: -10
  }

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }

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

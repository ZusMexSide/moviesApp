import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string | null, size: string = 'w500' ): string {
    if ( !img ) return './assets/no-image-banner.jpg';
    const imgURL = `${ URL }/${ size }/${ img }`;

    return imgURL;
  }

}

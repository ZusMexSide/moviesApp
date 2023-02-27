import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pairs'
})
export class PairsPipe implements PipeTransform {

  transform( array: any[] ): any[] {

    const pairs = array.reduce( ( result, value, index, arr ) => {
      if ( index % 2 === 0 ) {
        result.push( arr.slice(index, index + 2) );
      }
      return result;
    }, [] );

    return pairs;
  }

}

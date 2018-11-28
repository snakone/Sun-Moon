import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Pipe({
  name: 'image'
})

export class ImagesPipe implements PipeTransform {

  transform(image: string, collection: string = 'trainers'): any {
    let URL = URL_SERVICES + '/images';
    if (image == undefined) return URL + '/random/default-picture';  // Intentional
    if (image.includes('https')) return image;  // Https = Google Picture

    switch(collection){

      case 'trainers':
            URL += '/trainers/' + image;
      break;

      default:
            console.log('Collection Image doesn\'t exist');
            URL += '/random/default-picture';
    }
    return URL;
  }

}

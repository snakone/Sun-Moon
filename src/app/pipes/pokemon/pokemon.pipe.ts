import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemon'
})

export class PokemonPipe implements PipeTransform {

  transform(value: string, _args?: any): any {
    return value = value.replace(/([A-Z])/g, ' $1');
  }

}

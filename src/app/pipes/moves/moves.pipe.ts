import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'move'
})

export class MovesPipe implements PipeTransform {

  transform(value: any, _args?: any): any {
    return value = value.replace(/\s+/g, '');
  }

}

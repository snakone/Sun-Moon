import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})

export class TypesPipe implements PipeTransform {

  transform(value: any, _args?: any): any {
    if (value == 'SATK') return value = "Special";
    if (value == 'ATK') return value = "Physical";
    if (value == 'both') return value = "Both";

    if (typeof(value) == 'number'){  // Laboratory
      value = value.toString();
    }

    switch (value){
      case '1':
      value = "Tiny";
      break;
      case '2':
      value = "Medium";
      break;
      case '3':
      value = "Final";
      break;
      case '4':
      value = "Mega";
      break;
      case '5':
      value = "Mega R2";
      break;
    }

    return value;
  }

}

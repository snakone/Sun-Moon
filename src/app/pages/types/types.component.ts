import { Component, OnInit } from '@angular/core';
import { TYPES } from 'src/app/config/data';

@Component({
  selector: 'sun-moon-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})

export class TypesComponent implements OnInit {

  types: string[];

  constructor() { }

  ngOnInit() {
    this.types = TYPES;
  }

}

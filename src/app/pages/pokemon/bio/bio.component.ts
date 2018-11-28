import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';


@Component({
  selector: 'sun-moon-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})

export class BioComponent implements OnInit {

  @Input() pokemon: Pokemon;
  @Input() familiars: string[];
  urlImage: string = "../../../../assets/images/pokemon/";

  constructor() { }

  ngOnInit() {
  }

}

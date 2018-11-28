import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'sun-moon-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})

export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openInfo(info:string){

    switch (info) {
      case 'pokedex':
      Swal('Pokédex', `
      The Pokémon Encyclopedia! Search any Pokémon
      easy and fast with this amazing tool.`, 'info');
      break;

      case 'filter':
      Swal('Filter', `
      Filter any Pokémon by Stat, Type or Evolution.
      Find the best Pokémon to You!`, 'info');
      break;

      case 'guides':
      Swal('Guides', `
      Discover how to become a Master Trainer with plenty
      of Guides available to You!`, 'info');
      break;

      case 'profile':
      Swal('Trainer Profile', `
      Join the Community! Study your Team and become the Strongest!`, 'info');
      break;

    }
  }



}

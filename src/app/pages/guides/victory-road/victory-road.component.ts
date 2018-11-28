import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sun-moon-victory-road',
  templateUrl: './victory-road.component.html',
  styleUrls: ['./victory-road.component.scss']
})

export class VictoryRoadComponent implements OnInit {

  urlImage: string = "../../../../assets/images/guides/victory-road/";
  urlImagePokemon: string = "../../../../assets/images/pokemon/";

  constructor() { }

  ngOnInit() {
  }

  scrollToElement($element): void {  // Smooth Scrolling on Anchor Links
  $element.scrollIntoView({behavior: "smooth",
                           block: "start",
                           inline: "nearest"});
  }

}

import { Component, OnInit } from '@angular/core';
import { GRADE_A,
         GRADE_S,
         LEVEL15,
         LEVEL30,
         LEVEL50,
         LEVEL65 } from 'src/app/config/data';

@Component({
  selector: 'sun-moon-invasion',
  templateUrl: './invasion.component.html',
  styleUrls: ['./invasion.component.scss']
})

export class InvasionComponent implements OnInit {

  urlImage: string = "../../../../assets/images/guides/invasion/";
  urlPokemon: string = "../../../../assets/images/pokemon/";
  gradeA: string[] = GRADE_A;
  gradeS: string[] = GRADE_S;
  level15: string[] = LEVEL15;
  level30: string[] = LEVEL30;
  level50: string[] = LEVEL50;
  level65: string[] = LEVEL65;

  constructor() { }

  ngOnInit() {
  }

  scrollToElement($element): void {  // Smooth Scrolling on Anchor Links
  $element.scrollIntoView({behavior: "smooth",
                           block: "start",
                           inline: "nearest"});
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sun-moon-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent implements OnInit {

  urlImage: string = "../../../../assets/images/guides/challenge/";

  constructor() { }

  ngOnInit() {
  }

  scrollToElement($element): void {  // Smooth Scrolling on Anchor Links
  $element.scrollIntoView({behavior: "smooth",
                           block: "start",
                           inline: "nearest"});
  }

}

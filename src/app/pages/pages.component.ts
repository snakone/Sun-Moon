import { Component, OnInit, HostListener } from '@angular/core';

declare var $: any;  // JQuery
declare function init_plugins();  // Init JQuery Plugins

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {

  @HostListener('window:scroll') do(){  // Host Listener Window Scroll

  let pikachu = document.getElementById("Pikachu").style;  // Get the Pikachu Button
  let scroll = document.documentElement.scrollTop;  // Get the Document Scroll Value

  scroll > 350 ?
  pikachu.display = "block" : pikachu.display = "none";  // Swap Display
}

topFunction():void {  // Animation using JQuery
  $('body,html').animate({
				scrollTop: 0
			}, 800);  // 0.8 Seconds
  }

  constructor() { }

  ngOnInit() {
 // When coming Straight, Init JQuery Plugins -> SideBar
    init_plugins();
  }

}

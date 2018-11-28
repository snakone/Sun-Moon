import { Component, OnInit } from '@angular/core';
import { SidebarService, TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

declare function closeSideBar();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  trainer: Trainer;

  constructor(public _sidebar: SidebarService,
              public _trainer: TrainerService,
              private router: Router) { }

  ngOnInit() {
    this.trainer = this._trainer.trainer;
    this._sidebar.loadMenu();
    closeSideBar();  // Close SideBar on Init to reset the State.
  }

  closeBar(){  // CLose the Hover Menu after clicking a Link
    let element = document.getElementById("sidebarnav");
    let miniSideBar = document.body.classList.contains("mini-sidebar");
    if (window.innerWidth >= 768 && miniSideBar) this.checkElement(element);
    closeSideBar();  // Close SideBar at any Case
  }

  checkElement(element:HTMLElement){
    element.style.pointerEvents = 'none';  // Lose Hover Effect and Add it again
        setTimeout(()=> {  // Despite this is bad, It was the only solution I got
          element.style.pointerEvents = 'auto';
        }, 500);
  }

  logOut():void {
    if (this._trainer.trainerLogOut()){
        Swal('Goodbye!', 'Hope to see You soon!', 'info')
       .then(() => {
         this.router.navigate(['/signin']);
       });
    }
  }

}

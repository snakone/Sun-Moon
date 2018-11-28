import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

declare function closeSideBar();  // JQuery function

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`.logo {position:absolute;left:85px;top:5.5px;width:115px;}
            .logo:hover {cursor:pointer; filter:brightness(1.2);}`]
})

export class HeaderComponent implements OnInit {

  trainer: Trainer;
  value: string;
  searchForm: NgForm;

  constructor(public _trainer: TrainerService,
              private router: Router) { }

  ngOnInit() {
    this.trainer = this._trainer.trainer;
    const input = document.getElementById('search');
    this.listenInputChanges(input);
  }

  listenInputChanges(input: HTMLElement){
    fromEvent(input, 'input', {passive: true})
      .pipe(map((k: KeyboardEvent) => {
            return k.target['value'];
        }),debounceTime(1500))  // Wait 1.5s between Inputs
         .subscribe(res => {
        if (res != '') {
            this.router.navigate(['/searching', res])
        } else {
          console.log("You stop typing")
        }
      });
   }

   closeBar(){
     closeSideBar();
   }

   logOut():void {
     if (this._trainer.trainerLogOut()){
       Swal('Goodbye!', 'Hope to see You soon!', 'info')
        .then(() => {
          setTimeout(()=> {
            this.router.navigate(['/signin']);
           }, 1000)
        });
     }
   }

}

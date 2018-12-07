import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'sun-moon-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})

export class TrainersComponent implements OnInit {

  trainers: Trainer[] = [];
  filteredTrainers: Trainer[] = [];
  searchValue: string = "";
  count: number = 0;  // Total Trainers
  limit: number;
  page: number = 1;
  urlImage: string = "../../../assets/images/pokemon/";
  options: ScrollToOptions;

  constructor(private _trainer:TrainerService) { }

  ngOnInit() {
    this.getTrainers();
  }

  getTrainers(){
    this._trainer.getTrainerList()
     .subscribe((res:any) => {
       this.trainers = res.trainers;
       this.filteredTrainers = this.trainers;
       this.count = res.trainerCount;
     });
  }

  changeFrom(value: number){

    let rows = document.getElementById("rows").classList;
    if (value - this.page >= 1){  // NEXT
        rows.add("slideOutLeft");
        rows.remove("slideInRight","slideInLeft"); // Clear
        setTimeout(()=> {
          rows.remove("slideOutLeft");
          rows.add("slideInRight");
        }, 1000);  // Animate.CSS Duration
    }
    else if (value - this.page <= -1) {  // PREVIOUS
        rows.add("slideOutRight");
        rows.remove("slideInRight", "slideInLeft"); // Clear
        setTimeout(()=> {
          rows.remove("slideOutRight");
          rows.add("slideInLeft");
        }, 1000);  // Animate.CSS Duration
    }

      this.options = {top:200, left:0, behavior: 'smooth'};
      window.scrollTo(this.options);
      this.page = value;
  }


  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterTrainerbySearch();  // Filter Trainer
  }

  filterTrainerbySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredTrainers = this.trainers.filter(trainer => {  // Filter Array
       // ngModel on Input Text - Search Value
       return trainer.name.match(filter);  // Filter Original List
     } );
   }

}

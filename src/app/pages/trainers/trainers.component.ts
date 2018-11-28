import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';
import { LIMIT } from 'src/app/config/config';

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
  from: number = 0;
  limit: number;
  urlImage: string = "../../../assets/images/pokemon/";
  options: ScrollToOptions;

  constructor(private _trainer:TrainerService) { }

  ngOnInit() {
    this.getTrainers();
    this.limit = LIMIT;
  }

  getTrainers(){
    this._trainer.getTrainerListSort(this.from)
     .subscribe((res:any) => {
       this.trainers = res.trainers;
       this.filteredTrainers = this.trainers;
       this.count = res.trainerCount;
     });
  }

  changeFrom(value: number){
    let rows = document.getElementById("rows").classList;
    if (value === LIMIT){  // NEXT
        rows.add("slideOutLeft");
        rows.remove("slideInRight","slideInLeft"); // Clear
        setTimeout(()=> {
          rows.remove("slideOutLeft");
          rows.add("slideInRight");
        }, 1200);  // Animate.CSS Duration
    }
    else if (value === -LIMIT) {  // PREVIOUS
        rows.add("slideOutRight");
        rows.remove("slideInRight", "slideInLeft"); // Clear
        setTimeout(()=> {
          rows.remove("slideOutRight");
          rows.add("slideInLeft");
        }, 1200);  // Animate.CSS Duration
    }

    let from = this.from + value;
    if (from >= this.count || from < 0) return false;  // From out of Bounds?
    this.from += value;
      setTimeout(()=> {
      this.getTrainers();  // Get Trainers again upon this.from Changed
      this.options = {top:200, left:0, behavior: 'smooth'};
      window.scrollTo(this.options);
      }, 1000)
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

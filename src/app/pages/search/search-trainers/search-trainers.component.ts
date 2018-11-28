import { Component, OnInit, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-search-trainers',
  templateUrl: './search-trainers.component.html',
  styleUrls: ['./search-trainers.component.scss']
})

export class SearchTrainersComponent implements OnInit {

  @Input() trainers: Trainer[];

  constructor() { }

  ngOnInit() {
  }

}

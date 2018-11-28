import { Component, OnInit } from '@angular/core';
import { MoveService } from 'src/app/services/services.index';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'sun-moon-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss']
})

export class MovesComponent implements OnInit {

  moves: Move[] = [];
  filteredMoves: Move[] = [];
  searchValue: string = "";
  count: number = 0;

  constructor(private _move:MoveService) { }

  ngOnInit() {
    if (this._move.moves.length == 0){  // No Moves? Get from Server
      setTimeout(()=> {
          this.getMoves();  // Virtual Scroll??
      }, 500);
    } else {  // Get from Service
      this.moves = this._move.moves;
      this.filteredMoves = this.moves;
      this.count = this._move.count;
    }
  }

  getMoves(){
    this._move.getMoveList()
     .subscribe((res:any) => {
       this.moves = res.moves;
       this._move.moves = this.moves;
       this.filteredMoves = this.moves;
       this.count = res.moveCount;
       this._move.count = this.count;
     });
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterPokemonbySearch();  // Filter Move
  }

  filterPokemonbySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredMoves = this.moves.filter(move => {  // Filter Array
       // ngModel on Input Text - Search Value
       return move.name.match(filter);  // Filter Original List
     } );
   }

}

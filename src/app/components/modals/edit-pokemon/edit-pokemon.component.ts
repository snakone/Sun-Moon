import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { PokemonService } from 'src/app/services/services.index';
import { Pokemon } from 'src/app/models/pokemon.model';
import Swal from 'sweetalert2'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TYPES } from 'src/app/config/data';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})

export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon;
  types: string[];
  pokemonForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9.\'-][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _pokemon: PokemonService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.types = TYPES;
    this.pokemon = this.data;
    this.editPokemonForm();
  }

  editPokemonForm():void{
    this.pokemonForm = new FormGroup({
      _id: new FormControl(this.pokemon._id),
      name: new FormControl(this.pokemon.name, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      pokedex: new FormControl(this.pokemon.pokedex, [Validators.required]),
      picture: new FormControl(this.pokemon.picture, [Validators.required]),
      grade: new FormControl(this.pokemon.grade, [Validators.required]),
      evolution: new FormControl(this.pokemon.evolution, [Validators.required]),
      info: new FormControl(this.pokemon.info, [  // INFO
                                   Validators.required,
                                   Validators.minLength(10),
                                   Validators.maxLength(130)]),
      type: new FormControl(this.pokemon.type, [Validators.required]),
      type2: new FormControl(this.pokemon.type2),
      attack: new FormControl(this.pokemon.attack, [Validators.required]),
      legend: new FormControl(this.pokemon.legend, [Validators.required]),
      description: new FormControl(this.pokemon.description, [Validators.required]),
      family: new FormControl(this.pokemon.family, [Validators.required]),
      HP: new FormControl(this.pokemon.HP, [  // HP
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(445)]), // Manaphy HP
      ATK: new FormControl(this.pokemon.ATK, [  // ATK
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),  // 255 MAX SS
      DEF: new FormControl(this.pokemon.DEF, [  // DEF
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SATK: new FormControl(this.pokemon.SATK, [  // S.ATK
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SDEF: new FormControl(this.pokemon.SDEF, [  // S.DEF
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SPD: new FormControl(this.pokemon.SPD, [  // SPD
                                  Validators.required,
                                  Validators.min(1),
                                  Validators.max(255)]),
      SS: new FormControl(this.pokemon.SS, [  // SS
                                  Validators.required,
                                  Validators.min(1)])
    });
  }

  updatePokemon():void {
    if (this.pokemonForm.invalid) return;
    this._pokemon.updatePokemon(this.pokemonForm.value)
     .subscribe(() => {
       Swal('Alright!', 'Pokémon Updated', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}

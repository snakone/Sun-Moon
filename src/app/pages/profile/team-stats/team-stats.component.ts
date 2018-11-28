import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'sun-moon-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss']
})

export class TeamStatsComponent implements OnInit, OnChanges {

  @Input() trainer: Trainer;
  totalSS: number; totalSSRate: number;
  totalHP: number; totalHPRate: number;
  totalATK: number; totalATKRate: number;
  totalDEF: number; totalDEFRate: number;
  totalSATK: number; totalSATKRate: number;
  totalSDEF: number; totalSDEFRate: number;
  totalSPD: number; totalSPDRate: number;
  max:number;
  recommenedPower: number;
  rate: number = 0.0200080032;  // 4998/100 Where 4998 is Max Pokemon SS * 6
                                // (Progress bar MAX value is 100)
  rateStats: number = (255*6)/100; // Max Rate if All Pokémon have 255 on every Stat

  constructor() { }

  ngOnChanges(changes: SimpleChanges){  // Subscribe to Trainer Team Changes
    this.calculateTotal(changes.trainer.currentValue.team);  // Calculate Total SS of Trainer
    this.calculateRecommenedPower();
  }

  ngOnInit() {
  }

  calculateTotal(team:Pokemon[]){  // Calculate Total SS of Trainer Pokemon Team
   let totalSS = 0, totalHP = 0, totalATK = 0, totalDEF = 0,
   totalSATK = 0, totalSDEF = 0, totalSPD = 0;

      for (let i in team){  // Stats Summation
        totalSS = totalSS + team[i].SS;
        totalHP = totalHP + team[i].HP;
        totalATK = totalATK + team[i].ATK;
        totalDEF = totalDEF + team[i].DEF;
        totalSATK = totalSATK + team[i].SATK;
        totalSDEF = totalSDEF + team[i].SDEF;
        totalSPD = totalSPD + team[i].SPD;
      }

      this.max = Math.max(totalHP,totalATK,totalDEF,totalSATK,totalSDEF,totalSPD);

      // Assign Data to Class
      this.totalSS = totalSS; this.totalHP = totalHP; this.totalATK = totalATK;
      this.totalDEF = totalDEF; this.totalSATK = totalSATK;
      this.totalSDEF = totalSDEF; this.totalSPD = totalSPD;

      // Rates
      this.totalSSRate = this.totalSS * this.rate;  // Total SS * Rate (%)
      this.totalHPRate = this.totalHP / this.rateStats;
      this.totalATKRate = this.totalATK / this.rateStats;
      this.totalDEFRate = this.totalDEF / this.rateStats;
      this.totalSATKRate = this.totalSATK / this.rateStats;
      this.totalSDEFRate = this.totalSDEF / this.rateStats;
      this.totalSPDRate = this.totalSPD / this.rateStats;
  }

  calculateRecommenedPower(){
    let rate = 170000/4076;  // Total Power / Total SS
    this.recommenedPower = rate * this.totalSS;
  }

}

// home.component.ts
import { Component, OnInit } from '@angular/core';
import { IBet } from 'src/app/models/bet';
import { BetService } from 'src/app/services/bet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bets!: IBet[];

  constructor(private betService: BetService) {}

  ngOnInit(): void {
    this.bets = this.betService.getBets();
  }
}

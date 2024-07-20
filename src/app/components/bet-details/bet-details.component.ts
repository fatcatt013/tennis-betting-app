import { Component, Input, OnInit } from '@angular/core';
import { TennisProbabilityCalculatorService } from 'src/app/classes/TennisProbabilityCalculator';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-bet-details',
  templateUrl: './bet-details.component.html',
  styleUrls: ['./bet-details.component.scss'],
})
export class BetDetailsComponent implements OnInit {
  @Input() match!: IMatch;
  expectedValue: string = '';

  constructor(
    public matchesService: MatchesService,
    private probs: TennisProbabilityCalculatorService
  ) {}

  ngOnInit(): void {
    this.expectedValue = this.matchesService
      .calculateExpectedValue(this.match)
      .toFixed(2);
  }

  calcProbs() {
    let probs = this.probs.calculateProbabilities(this.match);
    console.log(this.matchesService.calculateDecimalOdds(probs));
  }
}

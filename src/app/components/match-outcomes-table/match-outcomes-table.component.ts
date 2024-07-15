import { Component, Input } from '@angular/core';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-match-outcomes-table',
  templateUrl: './match-outcomes-table.component.html',
  styleUrls: ['./match-outcomes-table.component.scss'],
})
export class MatchOutcomesTableComponent {
  @Input() matches: IMatch[] = [];
  results: any[] = [];

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.matches.forEach((match) => {
      this.results.push(...this.generateTableData(match));
    });
  }

  generateTableData(match: IMatch) {
    const outcomes = this.matchesService.calculatePotentialOutcomes(match);
    const tableData = outcomes.map((outcome) => {
      return {
        matchId: match.id,
        playerOne: match.playerOne.name,
        playerTwo: match.playerTwo.name,
        sets: this.matchesService.formatOutcomeSets(outcome.outcome, match),
        profit: outcome.profit,
      };
    });
    return tableData;
  }
}

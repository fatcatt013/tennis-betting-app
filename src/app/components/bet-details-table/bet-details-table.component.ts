import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable } from 'rxjs';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';
import { selectHighlightedMatches } from 'src/app/redux/selectors/matches.selectors';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-bet-details-table',
  templateUrl: './bet-details-table.component.html',
  styleUrls: ['./bet-details-table.component.scss'],
})
export class BetDetailsTableComponent {
  activeMatches$: Observable<IMatch[]> = this.store.select(
    selectHighlightedMatches
  );
  results: any[] = [];
  columns: any[] = [];

  constructor(
    private matchesService: MatchesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Calculate potential results for the provided matches
    this.activeMatches$.pipe(distinctUntilChanged()).subscribe((matches) => {
      this.results = this.matchesService.calculatePotentialResults(matches);
    });

    // Define columns for the ngx-datatable
    this.columns = [
      { prop: 'matchId', name: 'Match ID' },
      { prop: 'player', name: 'Player' },
      { prop: 'firstSetWin', name: 'First Set Win' },
      { prop: 'secondSetWin', name: 'Second Set Win' },
      { prop: 'matchWin', name: 'Match Win' },
      { prop: 'totalWin', name: 'Total Win' },
    ];
  }

  getRowClass(row: any) {
    return {
      'win-row': row.totalWin > 0,
      'loss-row': row.totalWin <= 0,
    };
  }
}

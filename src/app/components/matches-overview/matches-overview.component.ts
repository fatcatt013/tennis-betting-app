import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import {
  searchForMatch,
  searchForMatchSuccess,
} from 'src/app/redux/actions/sofascore.actions';
import { IMatch, IPLayer } from 'src/app/redux/interfaces/matches.interfaces';
import {
  ISofaScoreEvent,
  SofascoreTeam,
} from 'src/app/redux/interfaces/sofascore.interfaces';
import { selectHighlightedMatches } from 'src/app/redux/selectors/matches.selectors';
import { ApiService } from 'src/app/services/api.service';
import { fetchElo } from 'src/app/redux/actions/matches.actions';

@Component({
  selector: 'app-matches-overview',
  templateUrl: './matches-overview.component.html',
  styleUrls: ['./matches-overview.component.scss'],
})
export class MatchesOverviewComponent implements OnInit {
  highlightedMatches$: Observable<IMatch[]> = this.store.select(
    selectHighlightedMatches
  );
  matchesData: { [i: string]: ISofaScoreEvent | null } = {};
  selectedTab: number = 0;
  loading = true;
  expectedValue = 0;

  sofascoreDataLoaded = false;

  constructor(
    public matchesService: MatchesService,
    private store: Store,
    private updates$: Actions,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.highlightedMatches$.pipe(distinctUntilChanged()).subscribe((hMs) => {
      if (!this.sofascoreDataLoaded) {
        hMs.map((hM) => {
          console.log('Fetch match data');
          this.matchesData[hM.id] = null;
          this.store.dispatch(
            searchForMatch({
              p1: hM.playerOne.name,
              p2: hM.playerTwo.name,
              id: hM.id,
            })
          );
        });
      }

      this.sofascoreDataLoaded = true;
    });
    this.updates$
      .pipe(ofType(searchForMatchSuccess))
      .subscribe(({ match, id }) => {
        if (id) {
          this.matchesData[id] = match;
        }

        if (
          !Object.values(this.matchesData).some((match) => {
            match !== null;
          })
        ) {
          this.loading = false;
        }
      });
  }

  selectTab(index: number): void {
    this.selectedTab = index;
  }

  handleFetchElo(match: IMatch) {
    this.store.dispatch(fetchElo({ match }));
  }

  findPlayer(team: SofascoreTeam, match: IMatch): IPLayer {
    return [match.playerOne, match.playerTwo].find((player) => {
      let name = player.name.split(' ');
      return team.name.includes(name[name.length - 1]);
    }) as IPLayer;
  }
}

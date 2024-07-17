import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import {
  deleteMatch,
  highlightMatch,
} from 'src/app/redux/actions/matches.actions';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';
import {
  selectHighlightedMatches,
  selectMatches,
} from 'src/app/redux/selectors/matches.selectors';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
})
export class MatchesListComponent implements OnInit {
  matches$: Observable<IMatch[]> = this.store.select(selectMatches);
  highlightedMatches$: Observable<IMatch[]> = this.store.select(
    selectHighlightedMatches
  );

  constructor(
    private store: Store,
    public matchesService: MatchesService
  ) {}

  ngOnInit(): void {}

  handleDeleteMatch(id: string) {
    this.store.dispatch(deleteMatch({ id }));
  }
}

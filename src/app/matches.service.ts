import { Injectable } from '@angular/core';
import { IMatch } from './redux/interfaces/matches.interfaces';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, first, map, Observable } from 'rxjs';
import { selectHighlightedMatches } from './redux/selectors/matches.selectors';
import {
  highlightMatch,
  unhighlightMatch,
} from './redux/actions/matches.actions';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(private store: Store) {}
  highlightedMatches$: Observable<IMatch[]> = this.store.select(
    selectHighlightedMatches
  );

  isHighlighted(id: string): Observable<boolean> {
    return this.highlightedMatches$.pipe(
      distinctUntilChanged(),
      map((hMs: IMatch[]) => hMs.some((hM) => hM.id === id)),
      first()
    );
  }

  handleHighlight(id: string) {
    this.store.dispatch(highlightMatch({ id }));
  }

  handleUnhighlight(id: string) {
    this.store.dispatch(unhighlightMatch({ id }));
  }
}

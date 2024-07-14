import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';
import { selectMatches } from 'src/app/redux/selectors/matches.selectors';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
})
export class MatchesListComponent implements OnInit {
  matches$: Observable<IMatch[]> = this.store.select(selectMatches);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}

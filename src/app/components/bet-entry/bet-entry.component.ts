import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import { EBetType, IBetType } from 'src/app/models/bet';
import { editMatch, newMatch } from 'src/app/redux/actions/matches.actions';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';
import { selectMatches } from 'src/app/redux/selectors/matches.selectors';

@Component({
  selector: 'app-bet-entry',
  templateUrl: './bet-entry.component.html',
  styleUrls: ['./bet-entry.component.scss'],
})
export class BetEntryComponent implements OnInit {
  betForm!: FormGroup;
  @Input() matchId!: string;
  matches$: Observable<IMatch[]> = this.store.select(selectMatches);


  betTypes: IBetType[] = [
    {
      value: EBetType.FIRST_SET_WIN,
      label: '1. set WIN',
    },
    {
      value: EBetType.SECOND_SET_WIN,
      label: '2. set WIN',
    },
    {
      value: EBetType.MATCH_WIN,
      label: 'match WIN',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private store: Store,
    public matchesService: MatchesService
  ) {}

  ngOnInit(): void {
    this.betForm = this.fb.group({
      match: [null, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      odds: ['', [Validators.required, Validators.min(1)]],
      player: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });

  }

  onSubmit(): void {
    if (this.betForm.valid) {
      let val = this.betForm.value;
      this.store.dispatch(
        editMatch({
          id: val.match.id,
          data: {
            ...val.match,
            playerOne: {
              ...val.match.playerOne,
              playerData: undefined
            },
            playerTwo: {
              ...val.match.playerTwo,
              playerData: undefined
            },
            totalMoneyInvested: val.match.totalMoneyInvested + val.amount,
            bets: [
              ...val.match.bets,
              {
                player: {
                  ...val.player,
                  playerData: undefined
                },
                type: val.type.value,
                amount: val.amount,
                odds: val.odds,
                matchId: val.match.id,
                id: Date.now().toString(),
                potentialWin: val.odds * val.amount,
              },
            ],
          },
        })
      );
    }
  }
}

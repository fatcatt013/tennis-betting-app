import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { newMatch } from 'src/app/redux/actions/matches.actions';

@Component({
  selector: 'app-bet-entry',
  templateUrl: './bet-entry.component.html',
  styleUrls: ['./bet-entry.component.scss'],
})
export class BetEntryComponent implements OnInit {
  betForm!: FormGroup;
  @Input() matchId!: string;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.betForm = this.fb.group({
      match: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      odds: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.betForm.valid) {
      this.store.dispatch(
        newMatch({
          match: {
            id: Date.now().toString(),
            bets: [],
            currentSet: 1,
            points: {
              playerOne: 0,
              playerTwo: 0,
            },
            finished: false,
            totalMoneyInvested: 0,
            playerOne: {
              startingOdds: 0,
              name: '',
            },
            playerTwo: {
              startingOdds: 0,
              name: '',
            },
          },
        })
      );
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { newMatch } from 'src/app/redux/actions/matches.actions';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss'],
})
export class AddMatchComponent {
  matchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.matchForm = this.fb.group({
      playerOneName: ['', Validators.required],
      playerOneOdds: [0, [Validators.required, Validators.min(1)]],
      playerTwoName: ['', Validators.required],
      playerTwoOdds: [0, [Validators.required, Validators.min(1)]],
      date: [''],
      place: [''],
    });
  }

  get playerOneName() {
    return this.matchForm.controls['playerOneName'];
  }

  get playerOneOdds() {
    return this.matchForm.controls['playerOneOdds'];
  }

  get playerTwoName() {
    return this.matchForm.controls['playerTwoName'];
  }

  get playerTwoOdds() {
    return this.matchForm.controls['playerTwoOdds'];
  }

  onSubmit(): void {
    if (this.matchForm.valid) {
      const match: IMatch = {
        id: Date.now().toString(),
        playerOne: {
          startingOdds: this.matchForm.value.playerOneOdds,
          name: this.matchForm.value.playerOneName,
        },
        playerTwo: {
          startingOdds: this.matchForm.value.playerTwoOdds,
          name: this.matchForm.value.playerTwoName,
        },
        bets: [],
        currentSet: 1,
        points: { playerOne: 0, playerTwo: 0 },
        finished: false,
        totalMoneyInvested: 0,
        date: this.matchForm.value.date,
        place: this.matchForm.value.place,
      };

      console.log('New match!');
      this.store.dispatch(newMatch({ data: match }));
    }
  }
}

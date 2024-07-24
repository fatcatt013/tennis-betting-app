import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import {
  editMatch,
  editMatchSuccess,
} from 'src/app/redux/actions/matches.actions';
import { IMatch, IPLayer } from 'src/app/redux/interfaces/matches.interfaces';

@Component({
  selector: 'app-change-elo-modal',
  templateUrl: './change-elo-modal.component.html',
  styleUrls: ['./change-elo-modal.component.scss'],
})
export class ChangeEloModalComponent implements OnChanges {
  betForm?: FormGroup;
  @Input() match?: IMatch;
  initialized: boolean = false;

  players: IPLayer[] | null = null;

  constructor(
    private _modal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store,
    private $updates: Actions
  ) {}

  ngOnInit() {
    if (this.match && !this.initialized) {
      this.betForm = this.fb.group({
        player: [this.match.playerOne, Validators.required],
        elo: [0, [Validators.required, Validators.min(1)]],
      });
      this.players = [this.match.playerOne, this.match.playerTwo];
      this.initialized = true;
    }

    this.$updates
      .pipe(distinctUntilChanged(), ofType(editMatchSuccess))
      .subscribe(() => {
        this.handleClose();
      });
  }

  ngOnChanges() {}

  handleClose() {
    this._modal.close();
  }

  handleSubmitChangeElo() {
    let changedPlayer: IPLayer = {
      ...this.betForm?.controls['player'].value,
      elo: this.betForm?.controls['elo'].value,
    };

    this.store.dispatch(
      editMatch({
        id: this.match?.id as string,
        data: {
          ...this.match,
          playerOne: (this.players?.indexOf(
            this.betForm?.controls['player'].value
          )
            ? this.match?.playerOne
            : changedPlayer) as IPLayer,
          playerTwo: (this.players?.indexOf(
            this.betForm?.controls['player'].value
          )
            ? changedPlayer
            : this.match?.playerTwo) as IPLayer,
        } as IMatch,
      })
    );
  }
}

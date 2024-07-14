import { Component, Input } from '@angular/core';
import { IMatch } from 'src/app/redux/interfaces/matches.interfaces';

@Component({
  selector: 'app-bet-details',
  templateUrl: './bet-details.component.html',
  styleUrls: ['./bet-details.component.scss'],
})
export class BetDetailsComponent {
  @Input() match!: IMatch;
}

import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BetEntryComponent } from './components/bet-entry/bet-entry.component';
import { BetListComponent } from './components/bet-list/bet-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { matchesReducer } from './redux/reducers/matches.reducer';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { MatchesEffects } from './redux/effects/matches.effects';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BetEntryComponent,
    BetListComponent,
    AddMatchComponent,
    MatchesListComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    StoreModule.forRoot({ matches: matchesReducer }),
    EffectsModule.forRoot([MatchesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

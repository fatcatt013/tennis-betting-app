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
import { jsonReducer } from './redux/reducers/json.reducer';
import { JsonEffects } from './redux/effects/json.effects';
import { matchesReducer } from './redux/reducers/matches.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BetEntryComponent,
    BetListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    StoreModule.forRoot({ json: jsonReducer, matches: matchesReducer }),
    EffectsModule.forRoot([JsonEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

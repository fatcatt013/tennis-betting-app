import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetEntryComponent } from './components/bet-entry/bet-entry.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

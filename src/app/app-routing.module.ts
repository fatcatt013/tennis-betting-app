import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchesOverviewComponent } from './components/matches-overview/matches-overview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'matches-overview', component: MatchesOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

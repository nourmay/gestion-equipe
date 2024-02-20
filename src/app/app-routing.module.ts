import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./teams-component/home/home-teams.module').then(m => m.HomeModule) },
  { path: 'team-detail', loadChildren: () => import('./teams-component/team-detail/team-detail.module').then(m => m.TeamDetailModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { HomeTeamsComponent } from './home-teams.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeTeamsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeTeamsComponent }
    ])
  ]
})
export class HomeModule { }

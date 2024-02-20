import { NgModule } from '@angular/core';
import { TeamDetailComponent } from './team-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TeamDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: TeamDetailComponent }]),
  ],
})
export class TeamDetailModule {}

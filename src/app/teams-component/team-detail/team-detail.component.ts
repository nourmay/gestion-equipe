import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamCrudService } from '../../shared/services/team-crud.service';
import { DestoryComponent } from '../../shared/destroy/destroy.component';
import { takeUntil } from 'rxjs';
import { Team } from '../../shared/models/team.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent extends DestoryComponent implements OnInit {
  teamName!: string;
  team!: Team;
  showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 10;
  }

  constructor(private route: ActivatedRoute, private teamService: TeamCrudService, private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.teamName = history.state.strTeam;
    this.searchTeam();
  }

  searchTeam(): void {
    this.teamService.searchTeamByName(this.teamName).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data : any) => {
        this.team = data.teams[0];
    },
    error: (error: any) => {
       console.log(error);
    }
  })
  }
  goBack(): void {
    this.location.back();
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

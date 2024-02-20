import { TeamCrudService } from 'src/app/shared/services/team-crud.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { DestoryComponent } from '../../shared/destroy/destroy.component';
import { Team } from '../../shared/models/team.interface';
import { League } from 'src/app/shared/models/league.model';

@Component({
  selector: 'app-home',
  templateUrl: './home-teams.component.html',
  styleUrls: ['./home-teams.component.scss'],
})
export class HomeTeamsComponent extends DestoryComponent implements OnInit {
  searchForm!: FormGroup;
  teams$!: Observable<Team[]>;
  leagues!: League[];
  filteredLeagues!: League[];
  showSuggestion!: boolean;
  initialLeagueName!: string;
  showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 10;
  }
  constructor(
    private teamCrudService: TeamCrudService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      leagueName: new FormControl(''),
    });
    this.teamCrudService.getAllLeagues().pipe(takeUntil(this.destroy$)).subscribe({
      next: (leagues :any) => {
      this.leagues= leagues;
    },
    error: (error: any) => {
       console.log(error)
    }
  })
    this.searchForm?.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => {
        this.filteredLeagues = this.filterLeagues(value.leagueName);
        this.showSuggestion = true;
      });
  }

  searchTeams(): void {
    const leagueName = this.searchForm.value.leagueName;
    this.getLeagueDetails(leagueName);
    this.teams$ = this.teamCrudService.searchTeamsByLeague(leagueName).pipe(
      takeUntil(this.destroy$),
      map((response) => response.teams)
    );
  }

  clearInput(): void {
    this.searchForm.get('leagueName')?.setValue('');
  }

  navigateToTeamDetail(strTeam: string): void {
    this.router.navigate(['/team-detail'], { state: { strTeam } });
  }

  filterLeagues(value: string): League[] {
    // Filter leagues based on the search value
    return this.leagues.filter((league) =>
      league.strLeague.toLowerCase().includes(value.toLowerCase())
    );
  }
  getLeagueDetails(strLeague: string): void {
    this.teams$ = this.teamCrudService.searchTeamsByLeague(strLeague).pipe(
      takeUntil(this.destroy$),
      map((response) => response.teams)
    );
    this.showSuggestion = false;
    const leagueControlValue = this.searchForm.get('leagueName');
    leagueControlValue?.patchValue(strLeague, { emitEvent: false });
      this.initialLeagueName = leagueControlValue?.value;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

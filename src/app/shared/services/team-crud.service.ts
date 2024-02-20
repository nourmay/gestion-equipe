
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { League } from '../models/league.model';
@Injectable({
  providedIn: 'root'
})
export class TeamCrudService {
  private apiKey = '50130162';
  private baseUrl = 'https://www.thesportsdb.com/api/v1/json/';

  constructor(private http: HttpClient) { }

  searchTeamsByLeague(league: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/search_all_teams.php?l=${league}`;
    return this.http.get(url).pipe(shareReplay(1));
  }

  searchTeamByName(teamName: string): Observable<any> {
    const url = `${this.baseUrl}${this.apiKey}/searchteams.php?t=${teamName}`;
    return this.http.get(url);
  }

  getAllLeagues(): Observable<League[]> {
    const url = `${this.baseUrl}${this.apiKey}/all_leagues.php`;
    return this.http.get<any>(url).pipe(
      map(response => response ? response.leagues : [])
    );
  }
}



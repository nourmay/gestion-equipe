import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HomeTeamsComponent } from './home-teams.component';
import { TeamCrudService } from 'src/app/shared/services/team-crud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

fdescribe('HomeComponent', () => {
  let component: HomeTeamsComponent;
  let fixture: ComponentFixture<HomeTeamsComponent>;
  let teamService: TeamCrudService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTeamsComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [TeamCrudService],
    }).compileComponents();
    teamService = TestBed.inject(TeamCrudService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set leagueName value when input changes', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Test League';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.searchForm.get('leagueName')?.value).toEqual('Test League');
  });

  it('should clear input value', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const clearButton: HTMLButtonElement = fixture.nativeElement.querySelector('.clear-button');

    // Set input value
    inputElement.value = 'Test Value';
    inputElement.dispatchEvent(new Event('input')); // Trigger input event to update FormControl value

    // Click clear button
    clearButton.click();
    fixture.detectChanges(); // Update the view

    // Expect input value to be cleared
    expect(inputElement.value).toEqual('');
  });

  it('should call TeamCrudService searchTeamByName method with league name', () => {
    // Create a spy on the searchTeamByName method
    const searchTeamByNameSpy = spyOn(teamService, 'searchTeamsByLeague').and.returnValue(of({ teams: [] }));
    component.searchForm.get('leagueName')?.setValue('Test League');
    component.searchTeams();
    expect(searchTeamByNameSpy).toHaveBeenCalledWith('Test League');
  });
});

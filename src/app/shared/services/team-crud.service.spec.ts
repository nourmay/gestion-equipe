import { TestBed } from '@angular/core/testing';

import { TeamCrudService } from './team-crud.service';

describe('TeamCrudService', () => {
  let service: TeamCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

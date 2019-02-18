import { TestBed } from '@angular/core/testing';

import { GestionRepositoryService } from './gestion-repository.service';

describe('GestionRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionRepositoryService = TestBed.get(GestionRepositoryService);
    expect(service).toBeTruthy();
  });
});

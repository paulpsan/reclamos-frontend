import { TestBed, inject } from '@angular/core/testing';

import { Auth.Guard.TsService } from './auth.guard.ts.service';

describe('Auth.Guard.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.Guard.TsService]
    });
  });

  it('should be created', inject([Auth.Guard.TsService], (service: Auth.Guard.TsService) => {
    expect(service).toBeTruthy();
  }));
});

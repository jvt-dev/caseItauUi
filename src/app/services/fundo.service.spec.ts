import { TestBed } from '@angular/core/testing';

import { FundoService } from './fundo.service';

describe('FundoService', () => {
  let service: FundoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

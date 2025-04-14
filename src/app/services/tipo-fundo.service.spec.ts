import { TestBed } from '@angular/core/testing';

import { TipoFundoService } from './tipo-fundo.service';

describe('TipofundoService', () => {
  let service: TipoFundoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFundoService);
  });
});

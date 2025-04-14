import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundoListComponent } from './fundo-list.component';
import { FundoService } from 'src/app/services/fundo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('FundoListComponent', () => {
  let component: FundoListComponent;
  let fixture: ComponentFixture<FundoListComponent>;
  let fundoServiceMock: jasmine.SpyObj<FundoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FundoService', ['getAll', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [FundoListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: FundoService, useValue: spy }
      ]
    }).compileComponents();

    fundoServiceMock = TestBed.inject(FundoService) as jasmine.SpyObj<FundoService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

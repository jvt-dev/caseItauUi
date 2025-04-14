import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundoFormComponent } from './fundo-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FundoService } from 'src/app/services/fundo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('FundoFormComponent', () => {
  let component: FundoFormComponent;
  let fixture: ComponentFixture<FundoFormComponent>;
  let fundoService: jasmine.SpyObj<FundoService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const fundoServiceSpy = jasmine.createSpyObj('FundoService', ['getByCodigo', 'create', 'update', 'movimentarPatrimonio']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = {
      snapshot: { paramMap: { get: () => '123' }, url: [{ path: 'editar' }] }
    } as any;

    await TestBed.configureTestingModule({
      declarations: [FundoFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([]), HttpClientModule],
      providers: [
        { provide: FundoService, useValue: fundoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundoFormComponent);
    component = fixture.componentInstance;
    fundoService = TestBed.inject(FundoService) as jasmine.SpyObj<FundoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });
});

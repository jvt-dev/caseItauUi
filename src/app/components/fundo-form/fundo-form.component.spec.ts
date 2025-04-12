import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundoFormComponent } from './fundo-form.component';

describe('FundoFormComponent', () => {
  let component: FundoFormComponent;
  let fixture: ComponentFixture<FundoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundoListComponent } from './fundo-list.component';

describe('FundoListComponent', () => {
  let component: FundoListComponent;
  let fixture: ComponentFixture<FundoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

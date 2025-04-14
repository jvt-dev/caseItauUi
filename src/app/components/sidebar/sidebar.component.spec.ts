import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isCollapsed on toggle() call', () => {
    component.toggle();
    expect(component.isCollapsed).toBeTrue();
    component.toggle();
    expect(component.isCollapsed).toBeFalse();
  });

  it('should emit toggleSidebar event when toggle() is called', () => {
    spyOn(component.toggleSidebar, 'emit');

    component.toggle();
    expect(component.toggleSidebar.emit).toHaveBeenCalledWith(component.isCollapsed);
  });

  it('should display correct classes based on isCollapsed state', () => {
    component.isCollapsed = true;
    fixture.detectChanges();
    const sidebarElement = fixture.debugElement.query(By.css('.sidebar'));
    expect(sidebarElement.nativeElement.classList).toContain('collapsed');

    component.isCollapsed = false;
    fixture.detectChanges();
    expect(sidebarElement.nativeElement.classList).not.toContain('collapsed');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavigationComponent } from './sidenavigation.component';

describe('SidenavigationComponent', () => {
  let component: SidenavigationComponent;
  let fixture: ComponentFixture<SidenavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

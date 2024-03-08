import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RattingsComponent } from './rattings.component';

describe('RattingsComponent', () => {
  let component: RattingsComponent;
  let fixture: ComponentFixture<RattingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RattingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RattingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

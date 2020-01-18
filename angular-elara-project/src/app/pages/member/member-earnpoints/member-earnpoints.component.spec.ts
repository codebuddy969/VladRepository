import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEarnpointsComponent } from './member-earnpoints.component';

describe('MemberEarnpointsComponent', () => {
  let component: MemberEarnpointsComponent;
  let fixture: ComponentFixture<MemberEarnpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEarnpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEarnpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

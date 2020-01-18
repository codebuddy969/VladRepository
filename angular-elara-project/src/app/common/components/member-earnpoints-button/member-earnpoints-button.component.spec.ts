import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEarnpointsButtonComponent } from './member-earnpoints-button.component';

describe('MemberEarnpointsButtonComponent', () => {
  let component: MemberEarnpointsButtonComponent;
  let fixture: ComponentFixture<MemberEarnpointsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEarnpointsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEarnpointsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

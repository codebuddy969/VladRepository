import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRedeempointsComponent } from './member-redeempoints.component';

describe('MemberRedeempointsComponent', () => {
  let component: MemberRedeempointsComponent;
  let fixture: ComponentFixture<MemberRedeempointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRedeempointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRedeempointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

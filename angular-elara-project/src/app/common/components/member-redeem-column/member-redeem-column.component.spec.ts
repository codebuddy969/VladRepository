import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRedeemColumnComponent } from './member-redeem-column.component';

describe('MemberRedeemColumnComponent', () => {
  let component: MemberRedeemColumnComponent;
  let fixture: ComponentFixture<MemberRedeemColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRedeemColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRedeemColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

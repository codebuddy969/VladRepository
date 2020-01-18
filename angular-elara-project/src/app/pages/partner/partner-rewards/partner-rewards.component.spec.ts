import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRewardsComponent } from './partner-rewards.component';

describe('PartnerRewardsComponent', () => {
  let component: PartnerRewardsComponent;
  let fixture: ComponentFixture<PartnerRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

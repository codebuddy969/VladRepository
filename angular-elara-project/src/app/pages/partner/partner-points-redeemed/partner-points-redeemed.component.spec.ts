import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPointsRedeemedComponent } from './partner-points-redeemed.component';

describe('PartnerPointsRedeemedComponent', () => {
  let component: PartnerPointsRedeemedComponent;
  let fixture: ComponentFixture<PartnerPointsRedeemedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerPointsRedeemedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPointsRedeemedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

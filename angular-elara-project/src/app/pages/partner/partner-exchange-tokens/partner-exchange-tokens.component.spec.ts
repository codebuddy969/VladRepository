import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerExchangeTokensComponent } from './partner-exchange-tokens.component';

describe('PartnerExchangeTokensComponent', () => {
  let component: PartnerExchangeTokensComponent;
  let fixture: ComponentFixture<PartnerExchangeTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerExchangeTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerExchangeTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

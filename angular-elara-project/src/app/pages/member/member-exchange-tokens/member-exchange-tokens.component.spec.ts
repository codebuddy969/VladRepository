import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExchangeTokensComponent } from './member-exchange-tokens.component';

describe('MemberExchangeTokensComponent', () => {
  let component: MemberExchangeTokensComponent;
  let fixture: ComponentFixture<MemberExchangeTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberExchangeTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberExchangeTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

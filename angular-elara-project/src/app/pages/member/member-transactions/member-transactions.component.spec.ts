import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTransactionsComponent } from './member-transactions.component';

describe('MemberTransactionsComponent', () => {
  let component: MemberTransactionsComponent;
  let fixture: ComponentFixture<MemberTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

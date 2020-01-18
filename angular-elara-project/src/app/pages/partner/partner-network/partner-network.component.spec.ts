import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerNetworkComponent } from './partner-network.component';

describe('PartnerNetworkComponent', () => {
  let component: PartnerNetworkComponent;
  let fixture: ComponentFixture<PartnerNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

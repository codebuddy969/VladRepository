import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPointsAllocatedComponent } from './partner-points-allocated.component';

describe('PartnerPointsAllocatedComponent', () => {
  let component: PartnerPointsAllocatedComponent;
  let fixture: ComponentFixture<PartnerPointsAllocatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerPointsAllocatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPointsAllocatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

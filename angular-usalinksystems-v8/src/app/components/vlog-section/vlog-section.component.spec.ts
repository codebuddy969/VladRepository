import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VlogSectionComponent } from './vlog-section.component';

describe('VlogSectionComponent', () => {
  let component: VlogSectionComponent;
  let fixture: ComponentFixture<VlogSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VlogSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

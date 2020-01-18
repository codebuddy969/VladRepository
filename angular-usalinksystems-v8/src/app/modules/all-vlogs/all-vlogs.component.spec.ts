import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVlogsComponent } from './all-vlogs.component';

describe('AllVlogsComponent', () => {
  let component: AllVlogsComponent;
  let fixture: ComponentFixture<AllVlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllVlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

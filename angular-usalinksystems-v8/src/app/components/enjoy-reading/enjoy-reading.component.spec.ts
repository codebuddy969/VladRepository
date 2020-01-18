import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjoyReadingComponent } from './enjoy-reading.component';

describe('EnjoyReadingComponent', () => {
  let component: EnjoyReadingComponent;
  let fixture: ComponentFixture<EnjoyReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnjoyReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjoyReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

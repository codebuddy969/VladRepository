import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatonPageComponent } from './platon-page.component';

describe('PlatonPageComponent', () => {
  let component: PlatonPageComponent;
  let fixture: ComponentFixture<PlatonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

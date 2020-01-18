import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesContactComponent } from './packages-contact.component';

describe('PackagesContactComponent', () => {
  let component: PackagesContactComponent;
  let fixture: ComponentFixture<PackagesContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

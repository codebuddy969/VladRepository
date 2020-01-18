import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesModalComponent } from './packages-modal.component';

describe('PackagesModalComponent', () => {
  let component: PackagesModalComponent;
  let fixture: ComponentFixture<PackagesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

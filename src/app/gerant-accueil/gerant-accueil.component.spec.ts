import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantAccueilComponent } from './gerant-accueil.component';

describe('GerantAccueilComponent', () => {
  let component: GerantAccueilComponent;
  let fixture: ComponentFixture<GerantAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerantAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerantAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

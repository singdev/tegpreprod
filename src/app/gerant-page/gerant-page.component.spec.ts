import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantPageComponent } from './gerant-page.component';

describe('GerantPageComponent', () => {
  let component: GerantPageComponent;
  let fixture: ComponentFixture<GerantPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerantPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationCardComponent } from './realisation-card.component';

describe('RealisationCardComponent', () => {
  let component: RealisationCardComponent;
  let fixture: ComponentFixture<RealisationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealisationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealisationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStationServiceModalComponent } from './view-station-service-modal.component';

describe('ViewStationServiceModalComponent', () => {
  let component: ViewStationServiceModalComponent;
  let fixture: ComponentFixture<ViewStationServiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStationServiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStationServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

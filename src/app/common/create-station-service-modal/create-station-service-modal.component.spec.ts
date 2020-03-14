import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStationServiceModalComponent } from './create-station-service-modal.component';

describe('CreateStationServiceModalComponent', () => {
  let component: CreateStationServiceModalComponent;
  let fixture: ComponentFixture<CreateStationServiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStationServiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStationServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

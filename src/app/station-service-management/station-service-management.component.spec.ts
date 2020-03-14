import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationServiceManagementComponent } from './station-service-management.component';

describe('StationServiceManagementComponent', () => {
  let component: StationServiceManagementComponent;
  let fixture: ComponentFixture<StationServiceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationServiceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationServiceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

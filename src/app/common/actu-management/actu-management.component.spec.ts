import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuManagementComponent } from './actu-management.component';

describe('ActuManagementComponent', () => {
  let component: ActuManagementComponent;
  let fixture: ComponentFixture<ActuManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActuManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

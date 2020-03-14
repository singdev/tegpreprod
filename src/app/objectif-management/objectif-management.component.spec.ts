import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifManagementComponent } from './objectif-management.component';

describe('ObjectifManagementComponent', () => {
  let component: ObjectifManagementComponent;
  let fixture: ComponentFixture<ObjectifManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

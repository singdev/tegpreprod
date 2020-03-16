import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActuModalComponent } from './create-actu-modal.component';

describe('CreateActuModalComponent', () => {
  let component: CreateActuModalComponent;
  let fixture: ComponentFixture<CreateActuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

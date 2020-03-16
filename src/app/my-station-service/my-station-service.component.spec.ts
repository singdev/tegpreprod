import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStationServiceComponent } from './my-station-service.component';

describe('MyStationServiceComponent', () => {
  let component: MyStationServiceComponent;
  let fixture: ComponentFixture<MyStationServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStationServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

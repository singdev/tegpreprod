import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiStationComponent } from './wiki-station.component';

describe('WikiStationComponent', () => {
  let component: WikiStationComponent;
  let fixture: ComponentFixture<WikiStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

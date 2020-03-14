import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRealisationVolumeComponent } from './update-realisation-volume.component';

describe('UpdateRealisationVolumeComponent', () => {
  let component: UpdateRealisationVolumeComponent;
  let fixture: ComponentFixture<UpdateRealisationVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRealisationVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRealisationVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

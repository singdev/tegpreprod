import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmgPageComponent } from './tmg-page.component';

describe('TmgPageComponent', () => {
  let component: TmgPageComponent;
  let fixture: ComponentFixture<TmgPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmgPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmgPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionComponent } from './interaccion.component';

describe('InteraccionComponent', () => {
  let component: InteraccionComponent;
  let fixture: ComponentFixture<InteraccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteraccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

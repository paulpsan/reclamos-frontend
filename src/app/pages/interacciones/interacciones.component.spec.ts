import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionesComponent } from './interacciones.component';

describe('InteraccionesComponent', () => {
  let component: InteraccionesComponent;
  let fixture: ComponentFixture<InteraccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteraccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteraccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

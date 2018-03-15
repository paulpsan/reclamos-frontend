import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanciasComponent } from './instancias.component';

describe('InstanciasComponent', () => {
  let component: InstanciasComponent;
  let fixture: ComponentFixture<InstanciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

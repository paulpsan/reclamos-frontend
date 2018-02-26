import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipologiasComponent } from './tipologias.component';

describe('TipologiasComponent', () => {
  let component: TipologiasComponent;
  let fixture: ComponentFixture<TipologiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipologiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

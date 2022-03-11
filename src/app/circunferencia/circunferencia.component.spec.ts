import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircunferenciaComponent } from './circunferencia.component';

describe('CircunferenciaComponent', () => {
  let component: CircunferenciaComponent;
  let fixture: ComponentFixture<CircunferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircunferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircunferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

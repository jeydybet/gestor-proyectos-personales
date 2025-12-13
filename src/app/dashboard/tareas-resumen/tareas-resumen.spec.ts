import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasResumen } from './tareas-resumen';

describe('TareasResumen', () => {
  let component: TareasResumen;
  let fixture: ComponentFixture<TareasResumen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasResumen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasResumen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

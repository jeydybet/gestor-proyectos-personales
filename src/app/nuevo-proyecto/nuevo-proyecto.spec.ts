import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProyecto } from './nuevo-proyecto';

describe('NuevoProyecto', () => {
  let component: NuevoProyecto;
  let fixture: ComponentFixture<NuevoProyecto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoProyecto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoProyecto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

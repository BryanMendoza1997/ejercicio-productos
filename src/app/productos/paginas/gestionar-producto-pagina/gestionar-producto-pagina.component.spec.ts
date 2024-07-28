import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProductoPaginaComponent } from './gestionar-producto-pagina.component';

describe('GestionarProductoPaginaComponent', () => {
  let component: GestionarProductoPaginaComponent;
  let fixture: ComponentFixture<GestionarProductoPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarProductoPaginaComponent]
    });
    fixture = TestBed.createComponent(GestionarProductoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

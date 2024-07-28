import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProductoPaginaComponent } from './listar-producto-pagina.component';

describe('ListarProductoPaginaComponent', () => {
  let component: ListarProductoPaginaComponent;
  let fixture: ComponentFixture<ListarProductoPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarProductoPaginaComponent]
    });
    fixture = TestBed.createComponent(ListarProductoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

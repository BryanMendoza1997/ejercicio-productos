import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductoPaginaComponent } from './paginas/listar-producto-pagina/listar-producto-pagina.component';
import { GestionarProductoPaginaComponent } from './paginas/gestionar-producto-pagina/gestionar-producto-pagina.component';

const routes: Routes = [
  {
    path: 'listar-productos',
    component: ListarProductoPaginaComponent
  },
  {
    path: 'gestionar-producto',
    component: GestionarProductoPaginaComponent
  },
  {
    path: 'edit/:id',
    component: GestionarProductoPaginaComponent
  },
  {
    path: '**',
    redirectTo: 'listar-productos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }

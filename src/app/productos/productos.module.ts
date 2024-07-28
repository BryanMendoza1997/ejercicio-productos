import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ListarProductoPaginaComponent } from './paginas/listar-producto-pagina/listar-producto-pagina.component';
import { GestionarProductoPaginaComponent } from './paginas/gestionar-producto-pagina/gestionar-producto-pagina.component';
import { TablaProductosComponent } from './componentes/tabla-productos/tabla-productos.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ListarProductoPaginaComponent,
    GestionarProductoPaginaComponent,
    TablaProductosComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [DatePipe],
})
export class ProductosModule { }

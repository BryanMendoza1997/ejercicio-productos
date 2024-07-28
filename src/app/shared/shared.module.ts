import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaBusquedaComponent } from './componentes/caja-busqueda/caja-busqueda.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { SnackbarComponent } from './componentes/snackbar/snackbar.component';



@NgModule({
  declarations: [
    CajaBusquedaComponent,
    ModalComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CajaBusquedaComponent,
    ModalComponent,
    SnackbarComponent
  ]
})
export class SharedModule { }

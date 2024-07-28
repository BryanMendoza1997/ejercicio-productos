import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  message: string = '';
  isVisible = false;

  /*
  * Metodo que hace visible el componente por 3 segundos
  */
  showSnackbar(mensaje: string): void {
    this.message = mensaje;
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  /*
  * Metodo para ocultar el modal
  */
  closeSnackbar(): void {
    this.isVisible = false;
  }
}

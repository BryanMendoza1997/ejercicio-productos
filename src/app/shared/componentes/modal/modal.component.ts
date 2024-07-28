import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Datos } from 'src/app/productos/interfaces/productos.interface';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  producto ?: Datos;
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<Datos>();
  isVisible = false;

  /*
  * Metodo para mostrar el modal
  * @param {producto} datos del producto seleccionado
  */
  openModal(producto: Datos): void {
    this.isVisible = true;
    this.producto = producto;
  }

  /*
  * Metodo para ocultar el modal
  */
  closeModal(): void {
    this.isVisible = false;
  }

  /*
  * Metodo que emite un evento para cuando el usuario da click en el boton confirmar
  */
  onConfirm(): void {
    this.confirm.emit(this.producto);
    this.closeModal();
  }
}

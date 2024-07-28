import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Datos } from '../../interfaces/productos.interface';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/componentes/modal/modal.component';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent {

  @ViewChild('modal') modal!: ModalComponent;
  modalMensaje: string = '';
  private mensaje: string = '¿Estas seguro de eliminar el producto ';
  dropdownIndex: number | null = null;
  itemsPerPageOptions = [5, 10, 20];
  resgistrosPorPagina = this.itemsPerPageOptions[0];
  public options = [{
    descripcion: 'Modificar'
  },
  {
    descripcion: 'Eliminar'
  }];

  @Input()
  public productos: Datos[] = [];

  @Output()
  eliminarElemento = new EventEmitter<string>();

  /*
  * Constructor de la clase se lo utiliza para la inyeccion de dependencias
  */
  constructor(private router: Router) { }

  /*
  * Metodo get para obtener los productos
  * @return Un modelo con un numero limitado de registros
  */
  get obtenerProductos() {
    return this.productos.slice(0, this.resgistrosPorPagina);
  }

  /*
  * Metodo get para obtener el numero de registros que se muestra en la tabla
  * @return El numero de registros que se muestra en la tabla
  */
  get ObtenerNumeroRegistros(): number{
    return this.obtenerProductos.length
  }

  /*
  * Metodo se lo invoca cuando se cambia el valor del drowdown en el html
  * @param {event} control del DOM 
  * Se obtiene y se guarda el valor seleccionado.
  */
  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.resgistrosPorPagina = Number(target.value);
  }

  /*
  * Metodo para eliminar el producto seleccionado
  * @param {producto} recibe el modelo del producto seleccionado
  */
  eliminarProducto(producto: Datos): void {
    if (!producto) throw Error('Error al intentar borrar el registro!');
    this.modalMensaje = this.mensaje + producto.name +' ?';
    this.modal.openModal(producto);
  }

  /*
  * Metodo que redirecciona a la pagina de editar producto
  * @param {producto} recibe el modelo del producto seleccionado
  */
  modificarProducto(producto: Datos) {
    this.router.navigate(['/productos/edit', producto.id])
  }

  /*
  * Metodo para ocultar o mostrar el dorwdonw
  */
  mostrarOcultarOpciones(index: number):void{
    if (this.dropdownIndex === index) {
      this.dropdownIndex = null;
    } else {
      this.dropdownIndex = index;
    }
  }

  /*
  * Metodo que se ejecuta al dar click en cualquier parte del documento HTML
  * se lo ocupa para ocultar el drowndow en caso de hacer click en cualquier otro
  * lugar que no sea en drowndow
  * @param {event} recibe el elemento HTML en el cual han hecho click
  */
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;

    // Verifica si el clic ocurrió dentro de un dropdown
    const dropdowns = Array.from(document.querySelectorAll('.dropdown-content')) as HTMLElement[];
    const isClickInsideDropdown = dropdowns.some(dropdown => dropdown.contains(clickedElement));
    const isClickInsideButton = (clickedElement.closest('.dropdown-btn') !== null);

    // Si el clic no ocurrió dentro de un dropdown y no en el botón de dropdown, oculta el dropdown visible
    if (!isClickInsideDropdown && !isClickInsideButton) {
      this.dropdownIndex = null;
    }
  }

  /*
  * Metodo que emite un evento para eliminar un producto
  * @param {producto} recibe el modelo del producto seleccionado
  */
  onConfirm(producto: Datos): void {
    this.eliminarElemento.emit(producto.id)
  }
}

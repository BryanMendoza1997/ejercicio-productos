import { Component, OnInit, ViewChild } from '@angular/core';
import { Datos } from '../../interfaces/productos.interface';
import { ProductosService } from '../../servicios/productos.service';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/componentes/snackbar/snackbar.component';

@Component({
  selector: 'app-listar-producto-pagina',
  templateUrl: './listar-producto-pagina.component.html',
  styleUrls: ['./listar-producto-pagina.component.css']
})
export class ListarProductoPaginaComponent implements OnInit {

  @ViewChild('snackbar') snackbarr!: SnackbarComponent;
  productos: Datos[] = [];
  listaProductosAuxiliar: Datos[] = [];

  /*
  * Constructor de la clase se lo utiliza para la inyeccion de dependencias
  */
  constructor(private productosService: ProductosService,
    private router: Router) { }

  /*
  * Metodo que se ejecuta despues de inicializar la vista
  * Se llama al metodo de carga de productos
  */
  ngOnInit(): void {
    this.cargarProducto();
  }

  /*
  * Metodo para cargar los productos
  */
  cargarProducto(): void {
    this.productosService.consultarProductos().subscribe(productos => {
      this.productos = productos.data;
      this.listaProductosAuxiliar = [...this.productos]
    });
  }

  /*
  * Metodo para buscar el producto
  * @param {texto} string con el nombre del producto a buscar 
  */
  buscarProducto(texto: string): void {
    if (texto) {
      this.listaProductosAuxiliar = this.productos.filter(producto =>
        producto.name.toLowerCase().includes(texto.toLowerCase())
      )

    } else {
      this.listaProductosAuxiliar = [...this.productos];
    }

  }

  /*
  * Metodo para eliminar un producto
  * @param {id} identificador del producto a eliminar
  */
  eliminar(id: string): void {

    this.productosService.eliminarProducto(id).subscribe(respuesta => {
      if (respuesta) {
        if (respuesta === "Product removed successfully") this.cargarProducto();
      }
      this.snackbarr.showSnackbar(respuesta);
    })
  }

  /*
  * Metodo de redireccion para la pantalla de creacion del producto
  */
  redirigir(): void {
    this.router.navigate(['/productos/gestionar-producto'])
  }
}

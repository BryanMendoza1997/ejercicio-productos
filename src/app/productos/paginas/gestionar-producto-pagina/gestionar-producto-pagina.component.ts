import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdValidatorService } from '../../validators/id-validator.service';
import { ProductosService } from '../../servicios/productos.service';
import { Datos } from '../../interfaces/productos.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/componentes/snackbar/snackbar.component';
import { ValidatorsService } from '../../validators/validators.service';

@Component({
  selector: 'app-gestionar-producto-pagina',
  templateUrl: './gestionar-producto-pagina.component.html',
  styleUrls: ['./gestionar-producto-pagina.component.css']
})
export class GestionarProductoPaginaComponent implements OnInit {

  @ViewChild('snackbar') snackbarr!: SnackbarComponent;
  private idProducto: string = "";
  public formularioProductos: FormGroup = this.form.group(
    {
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.idValidatorService]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, this.validatorsService.validarFechaLiberacion]],
      date_revision: ['', [Validators.required]]
    },
    {
      validators: [
        this.validatorsService.validarFechaRevision('date_release','date_revision'),
      ]
    }
  )

  /*
  * Constructor de la clase se lo utiliza para la inyeccion de dependencias
  */
  constructor(private form: FormBuilder,
    private idValidatorService: IdValidatorService,
    private productosService: ProductosService,
    private validatorsService: ValidatorsService,
    private activateRoute: ActivatedRoute,
    private route: Router) { }

  /*
  * Metodo que se ejecuta despues de inicializar la vista
  * Se valida si es creacion o edicion de producto
  */
  ngOnInit(): void {
    if (!this.route.url.includes('edit')) return;

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.productosService.buscarProducto(id)),
      ).subscribe(producto => {

        if (!producto) return this.route.navigateByUrl('/');

        if (typeof producto !== 'boolean') {
          this.idProducto = producto?.id || "";
        }

        this.formularioProductos.reset(producto);
        this.formularioProductos.controls['id'].disable();
        return;
      });
  }

  /*
  * Metodo get para obtener los campos del formulario en un modelo
  * @return Un modelo con los datos del formulario
  */
  get producto(): Datos {
    const formulario = this.formularioProductos.value as Datos;
    return formulario;
  }

  /*
  * Metodo para enviar a actualizar o insertar el producto
  */
  onSubmit(): void {
    if (!this.formularioProductos.valid) {
      this.formularioProductos.markAllAsTouched();
      return;
    }

    if (this.idProducto.length > 0) {
      const datosProducto: Datos = this.producto;
      datosProducto.id = this.idProducto;
      this.productosService.modificarProducto(datosProducto).subscribe(resp => {
        this.snackbarr.showSnackbar(resp.message);
      });
      return;
    }

    if (this.formularioProductos.value.id) {
      this.productosService.insertarProducto(this.producto).subscribe(resp => {
        this.snackbarr.showSnackbar(resp.message);
        if (resp.message === "Product added successfully") {
          this.formularioProductos.reset();
        }
      });
    }
  }

  /*
  * Metodo para enviar a actualizar o insertar el producto
  * @param {field} nombre del control que se va a ejecutar la validacion
  * @return Un booleano o null dependiendo si el control a sido tocado y tiere errores 
  * en ese caso retorna un booleano 
  */
  isValidField(field: string): boolean | null {
    return this.formularioProductos.controls[field].errors
      && this.formularioProductos.controls[field].touched;
  }

  /*
  * Metodo para definir el mensaje de error del control
  * @param {field} nombre del control que se va a ejecutar la validacion
  * @return un string con el mensaje de error o puede retornar null en caso que no
  * este definida esa validacion.
  */
  getFieldError(field: string): string | null {

    if (!this.formularioProductos.controls[field]) return null;

    const errors = this.formularioProductos.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;

        case 'existente':
          return `Id existente!`;

        case 'fechaInvalida':
          return `Fecha invalida!`

      }
    }

    return null;
  }

  /*
   * Metodo para resetear los campos del formulario
   */
  limpiarFormulario(): void {
    if (this.idProducto.length > 0) return;
    this.formularioProductos.reset();
  }
}

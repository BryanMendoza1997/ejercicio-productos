import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-caja-busqueda',
  templateUrl: './caja-busqueda.component.html',
  styleUrls: ['./caja-busqueda.component.css']
})
export class CajaBusquedaComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription ?: Subscription;
  @Input()
  placeholder:string = 'Search...';
  @Input()
  initialValue:string = '';
  @Output()
  onDebounce = new EventEmitter<string>();

  /*
  * Metodo que se ejecuta despues de inicializar el componente
  * Se lo utiliza para emitir cada 400 milisegundos el valor pulsado en la
  * caja de texto
  */
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(400)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
  }

  /*
  * Metodo que se ejecuta antes de eliminar el componente
  * se lo utilizo para desuscribirnos del observable
  */
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  /*
  * Metodo para emitir el valor del componente (input) hacia el componente padre
  */
  onKeyPress(texto: string):void {
    this.debouncer.next(texto);
  }
}

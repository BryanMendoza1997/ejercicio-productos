import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class ValidatorsService {

    public validarFechaLiberacion(control: AbstractControl): ValidationErrors | null {
        // let fecha = control.value.toString() || '';
        if(!(control.value)) return null;
        
        const fecha = control.value.toString().split('-') || '';
        const fechaSeleccionada = new Date(fecha[0],Number(fecha[1]) - 1,fecha[2]).toLocaleDateString();
        const fechaActual = new Date().toLocaleDateString();
        return fechaSeleccionada >= fechaActual ? null : { 'fechaInvalida': true };
    }

    public validarFechaRevision(fechaLiberacion: string , fechaRevision: string ){

        return (formGroup: FormGroup): ValidationErrors | null => {
            const liberacion = formGroup.get(fechaLiberacion)?.value || '';
            const revision = formGroup.get(fechaRevision)?.value || '';

            if( !(liberacion.toString().length > 0) && !(revision.toString().length > 0) ) return null;

            let fecha = liberacion.toString().split('-')
            const fechaAuxiliarLiberacion = new Date(Number(fecha[0]) + 1,Number(fecha[1]) - 1,fecha[2]).toLocaleDateString();

            fecha = revision.toString().split('-')
            const fechaAuxiliarRevision = new Date(fecha[0],Number(fecha[1]) - 1,fecha[2]).toLocaleDateString();

            if(fechaAuxiliarLiberacion === fechaAuxiliarRevision) 
            {
                formGroup.get(fechaRevision)?.setErrors(null);
                return null;
            }
            formGroup.get(fechaRevision)?.setErrors( { 'fechaInvalida': true});
            return { 'fechaInvalida': true}
        }
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdValidatorService implements AsyncValidator {

    constructor(private http: HttpClient) { }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const identificador = control.value;

        return this.http.get<Observable<ValidationErrors | null>>(`http://localhost:3002/bp/products/verification/${identificador}`)
            .pipe(
                map(resp => {
                    return resp ? { existente: true } : null;
                })
            );
    }
}
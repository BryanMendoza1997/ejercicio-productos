import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, filter } from 'rxjs';
import { Datos, Productos } from '../interfaces/productos.interface';
import { Respuesta } from '../interfaces/respuesta.interface';
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class ProductosService {

    private apiUrl: string = environments.baseUrl;

    /*
    * Constructor de la clase se lo utiliza para la inyeccion de dependencias
    */
    constructor(private httpClient: HttpClient) { }

    /*
    * Metodo para la consulta de productos
    * @return un obervable con los productos
    */
    consultarProductos(): Observable<Productos> {
        return this.httpClient.get<Productos>(`${this.apiUrl}/products`);
    }

    /*
    * Metodo para eliminar un producto
    * @param {id} identificador del producto a eliminar
    * @return un observable con el mensaje de respuesta de la eliminacion
    */
    eliminarProducto(id: string): Observable<string> {
        return this.httpClient.delete<any>(`${this.apiUrl}/products/${id}`)
            .pipe(
                map(resp => { return resp?.message; }),
                catchError(error => of("")),
            );
    }

    /*
    * Metodo para insertar un producto
    * @param {producto} datos del producto a insertar
    * @return un observable con el mensaje de respuesta de la insercion del producto
    */
    insertarProducto(producto: Datos): Observable<Respuesta> {
        if (!producto.id) throw Error('producto id is required');
        return this.httpClient.post<Respuesta>(`${this.apiUrl}/products`, producto)
    }

    /*
    * Metodo para buscar un producto
    * @param {id} identificador del producto a buscar
    * @return un observable con el modelo de los datos del producto en caso de existir
    * en caso de error o de no exitir retorna una bandera con valor false
    */
    buscarProducto(id: string): Observable<Datos | boolean> {
        return this.httpClient.get<Productos>(`${this.apiUrl}/products`)
            .pipe(
                map(resp => {
                    if (resp.data) {
                        const datos: Datos[] = resp.data;
                        const producto = datos.find(d => d.id === id);
                        return producto as Datos || false;
                    }
                    return false;
                }),
                catchError(() => { return of(false) })
            )
    }

    /*
    * Metodo para modificar un producto
    * @param {producto} modelo con los datos del producto a modificar
    * @return un observable con un modelo de respuesta para determinar el estado de la modificacion
    */
    modificarProducto(producto: Datos): Observable<Respuesta> {
        if (!producto.id) throw Error('producto id is required');
        return this.httpClient.put<Respuesta>(`${this.apiUrl}/products/${producto.id}`, producto)
    }
}
import { Datos } from "./productos.interface";

export interface Respuesta {
    message: string,
    data ?: Datos[];
}
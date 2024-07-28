export interface Productos {
    data: Datos[];
}

export interface Datos {
    id?:            string;
    name:          string;
    description:   string;
    logo:          string;
    date_release:  Date;
    date_revision: Date;
}

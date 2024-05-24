export interface ICliente {
    nombre: string;
    apellidos: string;
    dni: string;
}

export interface IHistorial {
    recargaId: string;
    monto_recarga: string;
    banco: string;
    canalAtencion:string;
    fecha: string;
    hora: string;
}

export interface IRecargar {
    monto_recarga: string;
    banco: string;
    fecha: string;
    hora: string;
    canalAtencion:string;
}

export interface IAdjuntar {
    imagen:string;
}
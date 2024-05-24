import axios from 'axios';

const listarClientesServ = () => {
  return axios.get(`http://localhost:8000/api/clientes`);
};

const crearCliente = (data: {}) => {
    return axios.post(`http://localhost:8000/api/clientes`, data);
  };

const obtenerHistorial = (playerId: string) => {
    return axios.get(`http://localhost:8000/api/recargas/${playerId}`);
}

const recargarSaldo = (playerId: string, data: {}) => {
    return axios.post(`http://localhost:8000/api/clientes/${playerId}/recargas`, data);
}

const adjuntarImagen = (playerId: string, data: {}) => {
    return axios.post(`http://localhost:8000/api/clientes/${playerId}/imagenes`, data);
  };

export const ApuestaService = {
    listarClientesServ,
    obtenerHistorial,
    crearCliente,
    recargarSaldo,
    adjuntarImagen
};
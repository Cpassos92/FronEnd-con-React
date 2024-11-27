import axios from 'axios';

export class ClienteServices {
    baseUrl = "http://localhost:8080/cliente";

    // Obtener todos los clientes
    getAll() {
        return axios.get(`${this.baseUrl}/mostrarCliente`)
            .then(res => res.data)
            .catch(error => {
                console.error("Error al obtener los clientes:", error);
                throw error; // Para propagar el error
            });
    }

    // Guardar un nuevo cliente (recibe el objeto cliente como parámetro)
    save(data) {
        return axios.post(`${this.baseUrl}/nuevo`, data)
            .then(res => res.data)
            .catch(error => {
                console.error("Error al guardar el cliente:", error);
                throw error;
            });
    }

    // Eliminar un cliente (recibe el id del cliente a eliminar)
    delete(id) {
        return axios.delete(`${this.baseUrl}/delete/${id}`)
            .then(res => res.data)
            .catch(error => {
                console.error("Error al eliminar el cliente:", error);
                throw error;
            });
    }
}


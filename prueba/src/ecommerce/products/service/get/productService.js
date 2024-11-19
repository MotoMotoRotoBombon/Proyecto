import axios from "axios";

export function getProduct(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${import.meta.env.VITE_GET_ALL_INVENTORIES_URL}/${id}`)
            .then((response) => {
                const data = response.data;
                if (!data) {
                    console.info("🛈 No se encontró el producto con ID:", id);
                    resolve(null);
                } else {
                    resolve(data); // Retorna el producto encontrado
                }
            })
            .catch((error) => {
                console.error("Error en getProduct():", error);
                reject(error);
            });
    });
}
    


export function getProducts() {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_GET_ALL_INVENTORIES_URL)
            .then((response) => {
                const data = response.data; // Supone que data contiene los datos
                if (!data || !data.length) {
                    console.info("🛈 No se encontraron elementos para getProducts():");
                    resolve([]);
                } else {
                    resolve(data); // Retorna el array completo de productos
                }
            })
            .catch((error) => {
                console.error("Error en getProducts():", error);
                reject(error);
            });
    });
}

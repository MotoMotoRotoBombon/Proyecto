import axios from "axios";

export function AddOneShipping(shipping) {
    console.log("<<EJECUTA>> API <<AddOneShipping>> Requiere:", shipping);
    return new Promise((resolve, reject) => {
        try {
            axios.post(import.meta.env.VITE_POST_SHIPPING_URL, shipping) // Ajusta esta URL según tu .env
                .then((response) => {
                    console.log("<<RESPONSE>> AddOneShipping", response);
                    // Verifica si el estado de la respuesta es 200
                    if (response.status === 200) { 
                        resolve(response.data);  // La solicitud fue exitosa
                    } else {
                        console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneShipping>> de forma correcta", response);
                        reject(response);  // Rechaza si el estado no es 200
                    }
                })
                .catch((error) => {
                    console.error("<<ERROR>> en API <<AddOneShipping>>", error);
                    reject(error); 
                });
        } catch (error) {
            console.error("Error en la configuración de la solicitud:", error);
            reject(error);
        }
    });
}

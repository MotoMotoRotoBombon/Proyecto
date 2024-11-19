import axios from "axios";

export function AddOneShipping(shippings) {
    console.log("<<EJECUTA>> API <<AddOneInstitute>> Requiere:", shippings);
    return new Promise((resolve, reject) => {
        try {
            axios.post(import.meta.env.VITE_CAT_INSTITUTES_URL, shippings)
                .then((response) => {
                    console.log("<<RESPONSE>> AddOneInstitute", response);
                    // Verifica si el estado de la respuesta es 200
                    if (response.status === 200) { 
                        resolve(response.data);  // La solicitud fue exitosa
                    } else {
                        console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneInstitute>> de forma correcta", response);
                        reject(response);  // Rechaza si el estado no es 200
                    }
                })
                .catch((error) => {
                    console.error("<<ERROR>> en API <<AddOneInstitute>>", error);
                    reject(error); 
                });
        } catch (error) {
            console.error("Error en la configuración de la solicitud:", error);
            reject(error);
        }
    });
}

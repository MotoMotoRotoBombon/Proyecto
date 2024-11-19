 
import axios from "axios";
export function GetAllLabels() {
    return new Promise((resolve, reject) => {
      console.log("Intentando ejecutar la API <<GetAllLabels>>...");
      axios.get(import.meta.env.VITE_CAT_INSTITUTES_URL)
        .then((response) => {
          console.log("Respuesta de la API <<GetAllLabels>>:", response.data);
          const data = response.data;
  
          if (!data.success) {
            console.error("API no exitosa:", data);
            reject(data);
          } else if (data.data.length === 0) {
            console.info("Sin documentos en cat_etiquetas");
            resolve([]);
          } else if (data.success) {
            const labels = data.data[0].dataRes;
            console.log("Etiquetas obtenidas:", labels);
            resolve(labels);
          }
        })
        .catch((error) => {
          console.error("Error en la API <<GetAllLabels>>:", error);
          reject(error);
        });
    });
  }
  
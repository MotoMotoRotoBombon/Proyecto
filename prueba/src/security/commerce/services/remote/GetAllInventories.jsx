import axios from "axios";

export async function getAllShippings() {
  try {
    const url = import.meta.env.VITE_GET_ALL_INVENTORIES_URL;

    if (!url) {
      throw new Error("La URL de la API no está definida en el archivo de entorno.");
    }

    const result = await axios.get(url);
    console.log('<<AXIOS-SHIPPINGS>>: ', result.data);

    if (Array.isArray(result.data)) {
      return result.data; // Si es un array, lo retornamos directamente
    } else {
      console.warn("La respuesta no es un array o está vacía.");
      return []; // Devuelve un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error al realizar la petición a la API de envíos:", error.message);
    throw error;
  }
}

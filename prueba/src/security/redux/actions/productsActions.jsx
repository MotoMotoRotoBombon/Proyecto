// src/actions/inventariosActions.js
import axios from 'axios';

export async function getInventariosAll() {
		// Realizamos la solicitud GET a la API del inventario
		let result = await axios.get(`${import.meta.env.VITE_GET_ALL_INVENTORIES_URL}`);

		//console.log('<<AXIOS-INVENTARIO>>: ', result.data);
		return result.data; // Retornamos los datos del inventario obtenidos
}
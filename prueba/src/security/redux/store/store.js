// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import inventariosReducer from '../slices/productsSlice'; // Asegúrate de que la ruta sea correcta

const store = configureStore({
  reducer: {
    inventarios: inventariosReducer, // El nombre 'inventarios' debe coincidir con el nombre del slice
  },
});

export default store;
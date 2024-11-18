// src/slices/productsSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
    inventariosDataArr: [],
};

// Crear el slice
const productsSlice = createSlice({
    name: 'inventarios',
    initialState,
    reducers: {
        // Acción para establecer los datos de inventario
        SET_DATA_INVENTARIOS(state, action) {
            state.inventariosDataArr = action.payload;
        },
    },
});

// Exportar las acciones generadas
export const { SET_DATA_INVENTARIOS} = productsSlice.actions;

// Exportar el reducer para el store
export default productsSlice.reducer;
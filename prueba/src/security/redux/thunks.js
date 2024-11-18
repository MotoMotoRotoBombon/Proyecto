// src/thunks/inventariosThunks.js
import { getInventariosAll } from './actions/productsActions';
import { SET_DATA_INVENTARIOS } from './slices/productsSlice';

export const GET_DATA_START = () => {
    return async (dispatch, getState) => {
        dispatch(
            SET_DATA_INVENTARIOS(
                await getInventariosAll(),
            )
        )
    };
};
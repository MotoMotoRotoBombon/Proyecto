// src/components/InventariosComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DATA_START } from './thunks';  // Asegúrate de que la ruta sea correcta

const InventariosComponent = () => {
    const dispatch = useDispatch();
    const { inventariosDataArr, loading, error } = useSelector((state) => state.inventarios);  // Accedemos al estado de inventarios

    // Cargar los inventarios al montar el componente
    useEffect(() => {
        dispatch(GET_DATA_START());  // Llamamos al thunk para obtener los inventarios
    }, [dispatch]);

    // Mostrar un mensaje de carga mientras los inventarios se están obteniendo
    if (loading) return <p>Loading...</p>;

    // Mostrar un mensaje de error si ocurre algún problema al cargar los inventarios
    if (error) return <p>Error: {error}</p>;

    // Renderizar la lista de inventarios
    return (
        <ul>
            {inventariosDataArr.map((inventario) => (
                <li key={inventario._id}>  {/* Asegúrate de que '_id' sea el identificador correcto */}
                    {inventario.nombre} - ${inventario.precio} {/* Muestra las propiedades relevantes */}
                </li>
            ))}
        </ul>
    );
};

export default InventariosComponent;
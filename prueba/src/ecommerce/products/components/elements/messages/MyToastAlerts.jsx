import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Función para mostrar un mensaje de éxito
export const TOAST_EXITO = (mensaje) => {
    toast.success(mensaje, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

// Función para mostrar mensajes de error
export const showToastError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

// Contenedor global para incluir en tu aplicación
export const ToastAlertContainer = () => {
    return <ToastContainer />;
};

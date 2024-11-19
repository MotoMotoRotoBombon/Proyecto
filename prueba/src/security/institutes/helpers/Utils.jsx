// Función para simular un retraso (por ejemplo, 500 ms)
export const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//FIC: genera subdocumento detail_row
//si no se envian los parametros los valores los asigna por default
export const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => {
    return {
        Activo: activo,
        Borrado: borrado,
        detail_row_reg: [getDetailRowReg(usuarioReg)],
    };
};

//FIC: genera subdocumento array detail_row_reg
//si no se envia el parametro el valor lo asigna por default
export const getDetailRowReg = (usuarioReg = "SYSTEM") => {
    return {
        FechaReg: Date.now(),
        UsuarioReg: usuarioReg,
    };
};

import {  InstituteModel } from "../models/InstitutesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik 
export const InstituteValues = (values) => {
    let Institute = InstituteModel();
    Institute.IdInstitutoOK = values.IdInstitutoOK;
    Institute.IdNegocioOK = values.IdNegocioOK;
    Institute.IdEntregaOK = values.IdEntregaOK;
    Institute.IdEntregaBK = values.IdEntregaBK;
    Institute.IdOrdenOK = values.IdOrdenOK;
    return Institute;
};


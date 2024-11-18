import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
    return {
        IdInstitutoOK: "",
        IdInstitutoBK: "",
        IdInstitutoSupOK: "",
        DesInstituto: "",
        Alias: "",
        Matriz: "",
        IdTipoGiroOK: "",
        cat_negocios: [],
        detail_row: getDetailRow(),
    };
};
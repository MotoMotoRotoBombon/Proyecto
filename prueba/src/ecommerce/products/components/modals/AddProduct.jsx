import React, { useState } from "react";
import axios from "axios";
import MyAddLabels from "../../../../components/elements/atomos/MyAddLabels";
import { useFormik } from "formik";
import * as Yup from "yup";

const MyFormComponent = ({ instituteSel, idGen, postProduct, fetchDataProducts, handleReload }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdProdServOK: "",
      IdProdServBK: "",
      DesProdServ: "",
      CodigoBarras: "",
      Indice: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string(),
      IdProdServBK: Yup.string(),
      DesProdServ: Yup.string().required("Campo requerido"),
      CodigoBarras: Yup.string().matches(/^\d{13}$/, "Deben ser 13 dígitos"),
      Indice: Yup.string().required("Debes Agregar Índices de Búsqueda"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);

      values.IdProdServOK = `${instituteSel.IdInstitutoOK}-${idGen}`;
      values.IdInstitutoOK = instituteSel.IdInstitutoOK;

      if (!instituteSel.IdInstitutoOK) {
        setMensajeErrorAlert("Selecciona un Instituto");
        setLoading(false);
        return;
      }
      if (!values.Indice) {
        setMensajeErrorAlert("Debes Agregar Índices de Búsqueda");
        setLoading(false);
        return;
      }

      try {
        const product = crearProducto(values);
        await postProduct(product);
        await fetchDataProducts();
        setMensajeExitoAlert("Producto Creado ");
        handleReload();
      } catch (e) {
        setMensajeErrorAlert("No se pudo crear Producto");
      }
      setLoading(false);
    },
  });

  return (
    <Dialog open={true} onClose={() => {}} fullWidth>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <MyAddLabels
            disabled={!!mensajeExitoAlert}
            label={"Agrega Índices de Búsqueda"}
            onChangeLabels={(labels) => formik.setFieldValue("Indice", labels.join("-"))}
          />
          <button type="submit" disabled={loading}>Guardar</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MyFormComponent;

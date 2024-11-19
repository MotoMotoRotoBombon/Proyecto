import React, { useState } from "react";
import { InstituteValues } from "../../helpers/ShippingValues";
import { AddOneShipping } from "../../../institutes/services/remote/post/AddOneShipping";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddShippingModal = ({
  AddInstituteShowModal,
  setAddInstituteShowModal,
  handleReload,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdNegocioOK: "",
      IdEntregaOK: "",
      IdOrdenOK: "",
      Matriz: false,
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdNegocioOK: Yup.string().required("Campo requerido"),
      IdEntregaOK: Yup.string().required("Campo requerido"),
      IdOrdenOK: Yup.string().required("Campo requerido"),
      Matriz: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);

      try {
        // Transforma Matriz a "S" o "N"
        const shippingData = {
          ...values,
          Matriz: values.Matriz ? "S" : "N",
        };
        console.log("Datos enviados:", shippingData); // Verificar los datos enviados
        await AddOneShipping(shippingData);
        setMensajeExitoAlert("Envío agregado exitosamente.");
        handleReload(); // Recarga la tabla
        setAddInstituteShowModal(false); // Cierra el modal
      } catch (error) {
        console.error("Error al agregar el envío:", error);
        setMensajeErrorAlert("Error al agregar el envío.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={AddInstituteShowModal} onClose={() => setAddInstituteShowModal(false)} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography variant="h6">
            Agregar Nuevo Envío
          </Typography>
        </DialogTitle>
        <DialogContent>
          {mensajeErrorAlert && <Alert severity="error">{mensajeErrorAlert}</Alert>}
          {mensajeExitoAlert && <Alert severity="success">{mensajeExitoAlert}</Alert>}

          <TextField
            id="IdInstitutoOK"
            name="IdInstitutoOK"
            label="ID Instituto"
            fullWidth
            margin="dense"
            value={formik.values.IdInstitutoOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
            helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
          />
          <TextField
            id="IdNegocioOK"
            name="IdNegocioOK"
            label="ID Negocio"
            fullWidth
            margin="dense"
            value={formik.values.IdNegocioOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
            helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
          />
          <TextField
            id="IdEntregaOK"
            name="IdEntregaOK"
            label="ID Entrega"
            fullWidth
            margin="dense"
            value={formik.values.IdEntregaOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.IdEntregaOK && Boolean(formik.errors.IdEntregaOK)}
            helperText={formik.touched.IdEntregaOK && formik.errors.IdEntregaOK}
          />
          <TextField
            id="IdOrdenOK"
            name="IdOrdenOK"
            label="ID Orden"
            fullWidth
            margin="dense"
            value={formik.values.IdOrdenOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.IdOrdenOK && Boolean(formik.errors.IdOrdenOK)}
            helperText={formik.touched.IdOrdenOK && formik.errors.IdOrdenOK}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="Matriz"
                checked={formik.values.Matriz}
                onChange={(e) => formik.setFieldValue("Matriz", e.target.checked)}
              />
            }
            label="Matriz"
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="secondary"
            onClick={() => setAddInstituteShowModal(false)}
            loading={loading}
          >
            Cancelar
          </LoadingButton>
          <LoadingButton
            color="primary"
            type="submit"
            loading={loading}
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};


export default AddShippingModal;

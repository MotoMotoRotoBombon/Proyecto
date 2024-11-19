import React, { useState } from "react";
import { InstituteValues } from "../../helpers/ShippingValues";
import { AddOneInstitute } from "../../services/remote/post/AddOneShipping";
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

const AddShippingModal = ({ AddInstituteShowModal, setAddInstituteShowModal }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdNegocioOK: "",
      IdEntregaOK: "",
      IdEntregaBK: "",
      IdOrdenOK: "",
      Matriz: false,
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdNegocioOK: Yup.string().required("Campo requerido"),
      IdEntregaOK: Yup.string().required("Campo requerido"),
      IdEntregaBK: Yup.string().required("Campo requerido"),
      IdOrdenOK: Yup.string().required("Campo requerido"),
      Matriz: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);

      // Conversión de Matriz a "S" o "N"
      values.Matriz = values.Matriz ? "S" : "N";

      try {
        const Institute = InstituteValues(values);
        await AddOneInstitute(Institute);
        setMensajeExitoAlert("Instituto fue creado y guardado correctamente");
        formik.resetForm();
      } catch (e) {
        setMensajeErrorAlert("No se pudo crear el Instituto");
        console.error("Error al crear el Instituto:", e);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={AddInstituteShowModal} onClose={() => setAddInstituteShowModal(false)} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography variant="h6" component="div">
            <strong>Agregar Nuevo Instituto</strong>
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
          {mensajeErrorAlert && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <b>¡ERROR!</b> ─ {mensajeErrorAlert}
            </Alert>
          )}
          {mensajeExitoAlert && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
            </Alert>
          )}

          <TextField
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
            value={formik.values.IdInstitutoOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
            helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
            disabled={!!mensajeExitoAlert}
          />

          <TextField
            id="IdNegocioOK"
            label="IdNegocioOK*"
            value={formik.values.IdNegocioOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
            helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
            disabled={!!mensajeExitoAlert}
          />

          <TextField
            id="IdEntregaOK"
            label="IdEntregaOK*"
            value={formik.values.IdEntregaOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdEntregaOK && Boolean(formik.errors.IdEntregaOK)}
            helperText={formik.touched.IdEntregaOK && formik.errors.IdEntregaOK}
            disabled={!!mensajeExitoAlert}
          />

          <TextField
            id="IdEntregaBK"
            label="IdEntregaBK*"
            value={formik.values.IdEntregaBK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdEntregaBK && Boolean(formik.errors.IdEntregaBK)}
            helperText={formik.touched.IdEntregaBK && formik.errors.IdEntregaBK}
            disabled={!!mensajeExitoAlert}
          />

          <TextField
            id="IdOrdenOK"
            label="IdOrdenOK*"
            value={formik.values.IdOrdenOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdOrdenOK && Boolean(formik.errors.IdOrdenOK)}
            helperText={formik.touched.IdOrdenOK && formik.errors.IdOrdenOK}
            disabled={!!mensajeExitoAlert}
          />

          {/* Checkbox para Matriz */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.Matriz}
                onChange={(e) => formik.setFieldValue("Matriz", e.target.checked)}
                name="Matriz"
                color="primary"
              />
            }
            label="Matriz"
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="secondary"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setAddInstituteShowModal(false)}
          >
            CERRAR
          </LoadingButton>
          <LoadingButton
            color="primary"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            loading={loading}
          >
            GUARDAR
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddShippingModal;

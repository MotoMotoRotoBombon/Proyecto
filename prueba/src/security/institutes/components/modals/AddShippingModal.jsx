import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { AddOneShipping } from "../../../institutes/services/remote/post/AddOneShipping"; // Ajusta la ruta

const AddShippingModal = ({ AddShippingShowModal, setAddShippingShowModal }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      IdOK: "",
      IdNegocio: "",
      IdEntrega: "",
      IdEntregaBK: "",
      IdOrden: "",
    },
    validationSchema: Yup.object({
      IdOK: Yup.string().required("Campo requerido"),
      IdNegocio: Yup.string().required("Campo requerido"),
      IdEntrega: Yup.string().required("Campo requerido"),
      IdEntregaBK: Yup.string().required("Campo requerido"),
      IdOrden: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);

      try {
        await AddOneShipping(values); // Llama al servicio para guardar datos
        setMensajeExitoAlert("El envío fue creado y guardado correctamente");
        formik.resetForm();
      } catch (error) {
        setMensajeErrorAlert("No se pudo crear el envío");
        console.error("Error al crear el envío:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={AddShippingShowModal} onClose={() => setAddShippingShowModal(false)} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography variant="h6" component="div">
            <strong>Agregar Nuevo Envío</strong>
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
            id="IdOK"
            label="ID OK*"
            value={formik.values.IdOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdOK && Boolean(formik.errors.IdOK)}
            helperText={formik.touched.IdOK && formik.errors.IdOK}
            disabled={!!mensajeExitoAlert}
          />

          <TextField
            id="IdNegocio"
            label="ID Negocio*"
            value={formik.values.IdNegocio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdNegocio && Boolean(formik.errors.IdNegocio)}
            helperText={formik.touched.IdNegocio && formik.errors.IdNegocio}
            disabled={!!mensajeExitoAlert}
          />

          <TextField
            id="IdEntrega"
            label="ID Entrega*"
            value={formik.values.IdEntrega}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdEntrega && Boolean(formik.errors.IdEntrega)}
            helperText={formik.touched.IdEntrega && formik.errors.IdEntrega}
            disabled={!!mensajeExitoAlert}
          />

          <TextField
            id="IdEntregaBK"
            label="ID Entrega BK*"
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
            id="IdOrden"
            label="ID Orden*"
            value={formik.values.IdOrden}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.IdOrden && Boolean(formik.errors.IdOrden)}
            helperText={formik.touched.IdOrden && formik.errors.IdOrden}
            disabled={!!mensajeExitoAlert}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setAddShippingShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            loading={loading}
            disabled={!!mensajeExitoAlert}
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddShippingModal;

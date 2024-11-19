import React, { useState, useEffect } from "react";
import { AddOneShipping } from "../../services/remote/post/AddOneShipping";
//FIC: Services
import { GetAllLabels } from "../../../../security/labels/services/remote/get/GetAllLabels";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  const [instituteTypes, setInstituteTypes] = useState([]); // Estado para almacenar los tipos de instituto

  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdNegocioOK: "",
      IdEntregaOK: "",
      IdEntregaBK: "",
      IdOrdenOK: "",
      Matriz: false,
      TipoInstituto: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdNegocioOK: Yup.string().required("Campo requerido"),
      IdEntregaOK: Yup.string().required("Campo requerido"),
      IdEntregaBK: Yup.string().required("Campo requerido"),
      IdOrdenOK: Yup.string().required("Campo requerido"),
      Matriz: Yup.boolean(),
      TipoInstituto: Yup.string().when([], {
        is: () => instituteTypes.length > 0,
        then: Yup.string().required("Selecciona un tipo de instituto"),
      }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);

      try {
        await AddOneShipping(values);
        setMensajeExitoAlert("Instituto fue creado y guardado correctamente");
        formik.resetForm();
      } catch (error) {
        setMensajeErrorAlert("No se pudo crear el Instituto");
        console.error("Error al crear el Instituto:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  // Cargar los tipos de instituto dinámicamente
  useEffect(() => {
    const loadInstituteTypes = async () => {
      try {
        console.log("Intentando ejecutar la API <<GetAllLabels>>");
        const labels = await GetAllLabels();
        console.log("Respuesta de la API <<GetAllLabels>>:", labels);

        const types = labels.find((label) => label.IdEtiquetaOK === "IdTipoGiros");
        if (!types || !types.valores) {
          console.warn("No se encontraron tipos de instituto para 'IdTipoGiros'");
          setInstituteTypes([]); // Manejo de valores vacíos
          return;
        }

        console.log("Tipos de instituto cargados:", types.valores);
        setInstituteTypes(types.valores);
      } catch (error) {
        console.error("Error al cargar los tipos de instituto:", error);
        setInstituteTypes([]); // Vacía los tipos en caso de error
      }
    };

    if (AddInstituteShowModal) {
      loadInstituteTypes();
    }
  }, [AddInstituteShowModal]);

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

          {/* Lista desplegable dinámica para Tipo de Instituto */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="tipo-instituto-label">Tipo de Instituto*</InputLabel>
            <Select
              labelId="tipo-instituto-label"
              id="TipoInstituto"
              value={formik.values.TipoInstituto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.TipoInstituto && Boolean(formik.errors.TipoInstituto)}
              disabled={instituteTypes.length === 0} // Deshabilitar si no hay datos
            >
              {instituteTypes.length === 0 ? (
                <MenuItem disabled>No hay tipos disponibles</MenuItem>
              ) : (
                instituteTypes.map((type) => (
                  <MenuItem key={type.IdValorOK} value={type.IdValorOK}>
                    {type.valor}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
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

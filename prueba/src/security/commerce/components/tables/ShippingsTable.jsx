import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { MaterialReactTable } from "material-react-table";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddOneShipping } from "../../../institutes/services/remote/post/AddOneShipping";
import { GetAllLabels } from "../../../../security/labels/services/remote/get/GetAllLabels";
import { getAllShippings } from "../../services/remote/GetAllInventories";

// Columnas de la tabla
const InventoryColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID OK", size: 30 },
  { accessorKey: "IdNegocioOK", header: "ID Negocio", size: 150 },
  { accessorKey: "IdEntregaOK", header: "ID Entrega", size: 150 },
  { accessorKey: "IdOrdenOK", header: "ID Orden", size: 150 },
];

// Modal de agregar envío
const AddShippingModal = ({ AddInstituteShowModal, setAddInstituteShowModal, handleReload }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [instituteTypes, setInstituteTypes] = useState([]);

  // Cargar los tipos de instituto dinámicamente
  useEffect(() => {
    const loadInstituteTypes = async () => {
      try {
        const labels = await GetAllLabels();
        const types = labels.find((label) => label.IdEtiquetaOK === "IdTipoGiros");
        setInstituteTypes(types?.valores || []);
      } catch (error) {
        console.error("Error al cargar los tipos de instituto:", error);
        setInstituteTypes([]);
      }
    };
    if (AddInstituteShowModal) {
      loadInstituteTypes();
    }
  }, [AddInstituteShowModal]);

  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdNegocioOK: "",
      IdEntregaOK: "",
      IdOrdenOK: "",
      Matriz: false,
      TipoInstituto: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdNegocioOK: Yup.string().required("Campo requerido"),
      IdEntregaOK: Yup.string().required("Campo requerido"),
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
        const transformedValues = { ...values, Matriz: values.Matriz ? "S" : "N" };
        console.log("Enviando datos:", transformedValues); // Debug
        await AddOneShipping(transformedValues);
        setMensajeExitoAlert("Instituto fue creado y guardado correctamente");
        formik.resetForm();
        handleReload();
        setAddInstituteShowModal(false);
      } catch (error) {
        setMensajeErrorAlert("No se pudo crear el Instituto");
        console.error("Error al crear el Instituto:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={AddInstituteShowModal} onClose={() => setAddInstituteShowModal(false)} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography variant="h6">Agregar Nuevo Envío</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {mensajeErrorAlert && <Alert severity="error">{mensajeErrorAlert}</Alert>}
          {mensajeExitoAlert && <Alert severity="success">{mensajeExitoAlert}</Alert>}

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
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.Matriz}
                onChange={(e) => formik.setFieldValue("Matriz", e.target.checked)}
              />
            }
            label="Matriz"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Tipo de Instituto</InputLabel>
            <Select
              value={formik.values.TipoInstituto}
              onChange={formik.handleChange}
              name="TipoInstituto"
              error={formik.touched.TipoInstituto && Boolean(formik.errors.TipoInstituto)}
            >
              {instituteTypes.map((type) => (
                <MenuItem key={type.IdValorOK} value={type.IdValorOK}>
                  {type.valor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={() => setAddInstituteShowModal(false)}
          >
            Cerrar
          </LoadingButton>
          <LoadingButton color="primary" startIcon={<SaveIcon />} type="submit" loading={loading}>
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Tabla principal
const InventarioTabla = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [inventario, setInventoriData] = useState([]);
  const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

  const handleReload = async () => {
    setLoadingTable(true);
    try {
      const allShippingsData = await getAllShippings();
      console.log("Datos obtenidos:", allShippingsData);
      setInventoriData(allShippingsData);
    } catch (error) {
      console.error("Error al recargar los datos:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <Box>
      <MaterialReactTable
        columns={InventoryColumns}
        data={inventario}
        state={{ isLoading: loadingTable }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Agregar">
              <IconButton onClick={() => setAddInstituteShowModal(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Recargar">
              <IconButton onClick={handleReload}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
      <AddShippingModal
        AddInstituteShowModal={AddInstituteShowModal}
        setAddInstituteShowModal={setAddInstituteShowModal}
        handleReload={handleReload}
      />
    </Box>
  );
};

export default InventarioTabla;

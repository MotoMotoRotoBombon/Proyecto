//FIC: React
import React, { useEffect, useState } from "react";

//FIC: Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh"; // Importación del ícono Refresh

//FIC: DB
import { getAllShippings } from '../../services/remote/GetAllInventories';

//FIC: Modals
import AddShippingModal from "../../../institutes/components/modals/AddShippingModal";

//FIC: Columns Table Definition
const InventoryColumns = [
    { accessorKey: "IdInstitutoOK", header: "ID OK", size: 30 },
    { accessorKey: "IdNegocioOK", header: "ID Negocio", size: 150 },
    { accessorKey: "IdEntregaOK", header: "ID Entrega", size: 150 },
    { accessorKey: "IdOrdenOK", header: "ID Orden", size: 150 },
];

//FIC: Table - FrontEnd
const inventarioTabla = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [inventario, setInventoriData] = useState([]);
    const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

    const handleReload = async () => {
        setLoadingTable(true);
        try {
            const allShippingsData = await getAllShippings();
            setInventoriData(allShippingsData);
        } catch (error) {
            console.error("Error al recargar los datos:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        handleReload(); // Llama a la función de recarga al cargar el componente
    }, []);

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={InventoryColumns}
                    data={inventario}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Stack direction="row" sx={{ m: 1 }}>
                            <Box>
                                <Tooltip title="Agregar">
                                    <IconButton onClick={() => setAddInstituteShowModal(true)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Detalles">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Recargar">
                                    <IconButton onClick={handleReload}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Stack>
                    )}
                />
            </Box>
            {/* MODALES */}
            <Dialog open={AddInstituteShowModal}>
                <AddShippingModal
                    AddInstituteShowModal={AddInstituteShowModal}
                    setAddInstituteShowModal={setAddInstituteShowModal}
                    onClose={() => setAddInstituteShowModal(false)}
                    handleReload={handleReload}
                />
            </Dialog>
        </Box>
    );
};

export default inventarioTabla;

//FIC: React
import React, { useEffect, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: DB
import { getAllShippings } from '../../services/remote/GetAllInventories';
//FIC: Modals
import AddInstituteModal from "../../../institutes/components/modals/AddShippingModal";

//FIC: Columns Table Definition
const InventoryColumns = [
    { accessorKey: "IdInstitutoOK", header: "ID OK", size: 30 },
    { accessorKey: "IdNegocioOK", header: "ID Negocio", size: 150 },
    { accessorKey: "IdEntregaOK", header: "ID Entrega", size: 150 },
    { accessorKey: "IdOrdenOK", header: "ID Orden", size: 150 },
];

//FIC: Table - FrontEnd
const inventarioTabla = () => {
    // Controlar el estado de carga y datos
    const [loadingTable, setLoadingTable] = useState(true);
    const [inventario, setInventoriData] = useState([]);
    const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingTable(true); // Inicia el indicador de carga
            try {
                const allShippingsData = await getAllShippings();
                setInventoriData(allShippingsData);
            } catch (error) {
                console.error("Error al obtener los datos en useEffect:", error);
            } finally {
                setLoadingTable(false); // Finaliza el indicador de carga
            }
        };

        fetchData();
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
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
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
                                    <Tooltip title="Detalles ">
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- BARRA DE ACCIONES FIN ------ */}
                        </>
                    )}
                />
            </Box>
            {/* MODALES */}
            <Dialog open={AddInstituteShowModal}>
                <AddInstituteModal
                    AddInstituteShowModal={AddInstituteShowModal}
                    setAddInstituteShowModal={setAddInstituteShowModal}
                    onClose={() => setAddInstituteShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};

export default inventarioTabla;

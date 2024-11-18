
import React, { useEffect, useState } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllShippings } from '../../services/remote/GetAllInventories';
import AddShippingModal from "../../../institutes/components/modals/AddShippingModal";

const ShippingColumns = [
    { accessorKey: "IdOK", header: "ID OK", size: 30 },
    { accessorKey: "IdNegocio", header: "ID Negocio", size: 150 },
    { accessorKey: "IdEntrega", header: "ID Entrega", size: 150 },
    { accessorKey: "IdEntregaBK", header: "ID Entrega BK", size: 150 },
    { accessorKey: "IdOrden", header: "ID Orden", size: 150 },
];

const ShippingsTable = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [shippings, setShippingsData] = useState([]);
    const [AddShippingShowModal, setAddShippingShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingTable(true);
            try {
                const allShippingsData = await getAllShippings();
                setShippingsData(allShippingsData);
            } catch (error) {
                console.error("Error fetching shippings data:", error);
            } finally {
                setLoadingTable(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={ShippingColumns}
                    data={shippings}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Stack direction="row" sx={{ m: 1 }}>
                            <Box>
                                <Tooltip title="Agregar">
                                    <IconButton onClick={() => setAddShippingShowModal(true)}>
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
                    )}
                />
            </Box>
            <Dialog open={AddShippingShowModal}>
                <AddShippingModal
                    AddShippingShowModal={AddShippingShowModal}
                    setAddShippingShowModal={setAddShippingShowModal}
                    onClose={() => setAddShippingShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};

export default ShippingsTable;

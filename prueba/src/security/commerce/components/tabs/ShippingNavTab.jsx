import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const ecommerceTabs = ["Productos", "Carrito", "Perfil"];

const EcommerceNavTab = ({ setCurrentTab }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (event, newIndex) => {
        const selectedTab = ecommerceTabs[newIndex].toUpperCase();
        console.log("Entro al handleChange", selectedTab);

        setCurrentTab(selectedTab);
        setCurrentTabIndex(newIndex);
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, p: 0.5 }}>
            <Tabs
                value={currentTabIndex}
                variant="fullWidth"
                onChange={handleChange}
                aria-label="ecommerce navigation tabs"
                textColor="primary"
            >
                {ecommerceTabs.map((tab, index) => (
                    <Tab key={tab} label={tab} />
                ))}
            </Tabs>
        </Box>
    );
};

export default EcommerceNavTab;
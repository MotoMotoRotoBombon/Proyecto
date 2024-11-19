import { RouterProvider } from "react-router-dom";
import NaviRoutesShipping from "./navigation/NaviRoutesShipping";
import Footer from "./share/footer/components/Footer";
import { GET_DATA_START } from "./security/redux/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ProductsProvider } from "./ecommerce/products/pages/ProductsProvider"; // Asegúrate de ajustar la ruta según tu estructura de carpetas

export default function AppAllModules() {
	// Objeto para heredar clase de dispatch de Redux
	const dispatch = useDispatch();

	// Para que solo entre la primera vez a cargar la data
	useEffect(() => {
		dispatch(GET_DATA_START()).then(() => {
			console.log("<<END-DISPATCH>>: GET_DATA_START se ejecutó de forma correcta");
		});
	}, [dispatch]);

	return (
		<ProductsProvider>
			<div id="div-app">
				{/* Renderiza las rutas dentro del contexto de ProductsProvider */}
				<RouterProvider router={NaviRoutesShipping} />
				<div id="div-footer">
					<Footer />
				</div>
			</div>
		</ProductsProvider>
	);
}

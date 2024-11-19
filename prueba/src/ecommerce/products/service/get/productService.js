export function getProducts() {
    return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_CAT_PROD_SERV_URL)
        .then((response) => {
          const data = response.data;
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición getProducts():", data);
            reject(data);
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron elementos para getProducts():");
            resolve([]); 
          } else if (data.success) {
            const productos = data.data.map((item) => JSON.parse(JSON.stringify(item.dataRes)));
            console.log("PRODUCTOS", productos);
            resolve(productos);
          }
        })
        .catch((error) => {
          console.error("Error en getProducts():", error);
          reject(error);
        });
    });
  }
  
  export function getProduct(id) {
    return new Promise((resolve, reject) => {
      axios.get(import.meta.env.VITE_CAT_PROD_SERV_URL + id)
        .then((response) => {
          const data = response.data;
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición getProduct():", data);
            reject(data);
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron elementos para getProduct():");
            resolve([]);
          } else if (data.success) {
            const producto = JSON.parse(JSON.stringify(data.data[0].dataRes));
            console.log("PRODUCTO", producto);
            resolve(producto);
          }
        })
        .catch((error) => {
          console.error("Error en getProduct():", error);
          reject(error);
        });
    });
  }
  
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "/src/styles/global.css";

const Productos = (props) => {
  const { categoria } = props;
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoriasMap = {
    dormitorio: [1, 2, 3, 4, 5, 6, 12],
    "cocina-y-comedor": [7, 8],
    oficina: [9, 10, 11],
  };

  useEffect(() => {
    setLoading(true);

    if (!categoriasMap[categoria]) {
      setError("Categoría no encontrada.");
      setLoading(false);
      return;
    }

    const fetchProductos = async () => {
      let { data: Products, error } = await supabase
        .from("Products")
        .select(
          `
          id_product, name, description, price, fake_price, stock,
          Product_image (image_url)
        `
        )
        .in("id_category", categoriasMap[categoria]); // Obtiene todos los productos

      if (error) {
        console.error("Error al obtener productos:", error);
        setError("No se pudieron cargar los productos.");
      } else {
        const productosConImagen = Products.map((producto) => ({
          ...producto,
          image_url:
            producto.Product_image.length > 0
              ? producto.Product_image[0].image_url
              : "/placeholder.jpg",
        }));

        setProductos(productosConImagen);
      }
      setLoading(false);
    };

    fetchProductos();
  }, [categoria]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-sand font-light text-gray-900 mb-6">
          De todo para tu {categoria}
        </h2>

        {loading && <p className="text-gray-500">Cargando productos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productos.length > 0
            ? productos.map((producto) => (
                <a
                  key={producto.id_product}
                  href={`/products/${producto.id_product}`}
                  className="group border border-gray-200 rounded-lg p-4"
                >
                  <img
                    src={producto.image_url || "/placeholder.jpg"}
                    alt={producto.name}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                  />
                  <h3 className="mt-4 font-bold">{producto.name}</h3>
                  <p className="mt-1 text-lg font-normal text-gray-900 flex gap-4">
                    <span className="font-medium">S/. {producto.price}</span>
                    <span className="text-gray-500 line-through">
                      S/. {producto.fake_price}
                    </span>
                  </p>
                </a>
              ))
            : !loading && (
                <p className="text-center text-gray-500">
                  No hay productos disponibles.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Productos;

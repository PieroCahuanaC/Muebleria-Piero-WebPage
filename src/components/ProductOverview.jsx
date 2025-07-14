import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/Cartcontext.jsx";
import ButtonQuantity from "./ButtonQuantity.jsx";
import Accordion from "./Accordion.jsx";
import "/src/styles/global.css";

const ProductOverview = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    console.error("Error: `CartContext` no está disponible en `ProductOverview.jsx`");
    return null;
  }

  const { cart, addToCart, openCart } = cartContext;


  useEffect(() => {
    fetch(`/api/products?id_product=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);

        if (data.images && data.images.length > 0) {
          setImage(data.images[0].image_url);
        }
      })
      .catch((err) => console.error("Error al obtener el producto", err));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const images = product?.images || [];

  const handleAddToCart = () => {
    if (!product) return;
  
    const newProduct = {
      id: product.id_product,
      name: product.name,
      price: product.price,
      imageSrc: product.images?.[0]?.image_url || "/placeholder.jpg",
      quantity: quantity,
    };
  
    console.log("🛒 Enviando producto al carrito:", newProduct);
    addToCart(newProduct);
  
    // 🧠 Guardar mensaje en localStorage
    localStorage.setItem("addedProductMessage", newProduct.name);
  
    // 🔁 Recargar la página
    window.location.reload();
  };
  
  

  return (
    <div>
      <div className="bg-white shadow-sm sticky top-0"></div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[500px] md:h-[450px] rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Producto seleccionado"
                    className="max-h-[480px] w-auto object-contain rounded-lg"
                  />
                ) : (
                  <p className="text-gray-500">No hay imagen disponible</p>
                )}
              </div>

              <div className="flex -mx-2 mb-4">
                {product.images.map((img, index) => (
                  <div key={img.id_image} className="flex-1 px-2">
                    <button
                      onClick={() => setImage(img.image_url)}
                      className={`focus:outline-none w-full rounded-lg h-32 md:h-32 bg-gray-100 flex items-center justify-center ${
                        image === img.image_url
                          ? "ring-2 ring-indigo-300 ring-inset"
                          : ""
                      }`}
                    >
                      <img
                        src={img.image_url}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {product.name}
              </h2>
              <div className="flex items-center space-x-4 my-4">
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className=" mr-1 mt-1 font-medium">S/.</span>
                  <span className=" text-2xl font-medium">{product.price}</span>
                </div>
                <div className="flex-1">
                  <p className="line-through text-gray-600  text-xl">
                    S/. {product.fake_price}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm text-justify text-sans">
                {product.description}
              </p>
              <div className="flex py-4 space-x-4">
                <ButtonQuantity quantity={quantity} setQuantity={setQuantity} />
                <button
                  type="button"
                  onClick={() => {
                    console.log("🛒 Botón clickeado");
                    handleAddToCart();
                  }}
                  className="h-14 px-6 py-2 font-semibold border-2 border-gray-400 hover:bg-gray-200"
                >
                  Añadir al carrito
                </button>
              </div>

              <Accordion product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;

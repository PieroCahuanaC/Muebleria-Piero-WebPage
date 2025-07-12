import { CartProvider } from "../context/Cartcontext.jsx";
import CartButton from "./Cartbutton.jsx";
import ProductOverview from "./ProductOverview.jsx";

export default function CarritoWrapper({ id }) {
  return (
    <CartProvider>
      {id ? <ProductOverview id={id} /> : <CartButton />}
    </CartProvider>
  );
}

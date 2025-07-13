// src/components/CartIconWrapper.jsx
import { CartProvider } from "../context/Cartcontext.jsx";
import CartButton from "./Cartbutton.jsx";

export default function CartIconWrapper() {
  return (
    <CartProvider>
      <CartButton />
    </CartProvider>
  );
}
